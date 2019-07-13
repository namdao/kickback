import {
  CREATE_REPORT,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAILED,
  CREATE_REPORT_COMMENT,
  CREATE_REPORT_COMMENT_SUCCESS,
  CREATE_REPORT_COMMENT_FAILED,
} from "@constants/action-names";
import { put, takeLatest, select } from 'redux-saga/effects';
import { apiCreateReport, apiCreateReportComment } from '@services/report-api';
import { validError, reportDone } from "@utils/msgError";
import { Common } from "@utils/common";

import { startLoading, stopLoading } from "@actions/loading";

function* report(action) {
  try{

    yield put(startLoading());
    const state = yield select();
    // const { userReducer } = state;
    const {userReducer:{access_token},entitiesReducer:{results,dashBoardData,profileFollowingPost}} = state;
    // const { access_token } = userReducer;
    const { data, err } = yield apiCreateReport(access_token, action.payload);
    const {post} = action.payload;
    yield Common.sleep(300);
    if (err) {
      yield put(stopLoading());
      yield put({ type: CREATE_REPORT_FAILED });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put(stopLoading());
    yield put({ type: CREATE_REPORT_SUCCESS, data });
    // const idx_result = results.findIndex(e => e.post_id == post);
    // const idx_dashboard = dashBoardData.findIndex(e => e.post_id == post);
    // const idx_profileFollowing = profileFollowingPost.findIndex(e => e.post_id == post);
    // const payload = {
    //   idx_result: idx_result,
    //   idx_dashboard: idx_dashboard,
    //   idx_profileFollowing: idx_profileFollowing
    // }
    // yield put (setPlayIndex(payload));
    yield put (stopLoading());
    reportDone();
  }catch(err){
    // alert(err);
  }
}


function* reportComment(action) {
  try{
    yield put(startLoading());
    let {comment:{comment_id,parent},reason} = action.payload
    const state = yield select();
    const { userReducer } = state;
    const { access_token } = userReducer;
    const { data, err } = yield apiCreateReportComment(access_token,{comment:comment_id,reason});
    yield Common.sleep(300);
    if (err) {
      yield put(stopLoading());
      yield put({ type: CREATE_REPORT_COMMENT_FAILED });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put(stopLoading());
    let payload = {
      parent,
      comment_id
    }
    yield put({ type: CREATE_REPORT_COMMENT_SUCCESS, payload });
    reportDone();
    return;
  }catch(err){
    // alert(err);
  }
}

function* reportSaga() {
  yield takeLatest(CREATE_REPORT, report);
  yield takeLatest(CREATE_REPORT_COMMENT, reportComment);
}

export default reportSaga;