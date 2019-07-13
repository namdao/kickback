import {
  LIST_NOTIFY,
  LIST_NOTIFY_SUCCESS,
  LIST_NOTIFY_FAIL,
  LIST_NOTIFY_LOAD_MORE,
  LIST_NOTIFY_LOAD_MORE_SUCCESS,
  LIST_NOTIFY_LOAD_MORE_FAILED,
  REQUEST_FOLLOW
} from '@constants/action-names';
import { put, takeLatest, select } from 'redux-saga/effects';
import { apiGetListNotify, apiGetListNotifyMore,apiRequestFollow } from '@services/notify-api';
import { validError } from '@utils/msgError';
import {startLoading, stopLoading } from "@actions/loading";
import {requestFollowSuccess,requestFollowFail} from '@actions/notify';
function* listNotify(action) {
  try{
    yield put (startLoading());
    const state = yield select();
    const { userReducer: { access_token } } = state;
    const { data, err } = yield apiGetListNotify(access_token, action.payload);
    
    if (err) {
      yield put({ type: LIST_NOTIFY_FAIL });
      yield put (stopLoading());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put({ type: LIST_NOTIFY_SUCCESS, data: data });
    yield put (stopLoading());
  }catch(err){
    // alert(err);
  }
}

function* listNotifyLoadMore(action) {
  try{
    const state = yield select();
    const { userReducer: { access_token } } = state;
    const { data, err } = yield apiGetListNotifyMore(access_token, action.payload.next);
    if (err) {
      yield put({ type: LIST_NOTIFY_LOAD_MORE_FAILED });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put({ type: LIST_NOTIFY_LOAD_MORE_SUCCESS, data: data });
  }catch(err){
    // alert(err)
  }

}

function* requestFollow(action){
  const state = yield select();
  const { userReducer: { access_token } } = state;
  let { data, err } = yield apiRequestFollow(access_token, action.payload);
  if (err) {
    yield put(requestFollowFail(err));
    // if(err.code && err.code == 101){
    //   // validError(err);
    //   return;
    // }
    validError(err);
    return;
  }
  data.trackId = action.payload.trackId;
  yield put(requestFollowSuccess(data));
  yield put (stopLoading());
}

function* notifySaga() {
  yield takeLatest(LIST_NOTIFY, listNotify);
  yield takeLatest(LIST_NOTIFY_LOAD_MORE, listNotifyLoadMore);
  yield takeLatest(REQUEST_FOLLOW, requestFollow);
}

export default notifySaga;
