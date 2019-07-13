import {
  REQUEST_ENTITY_DETAIL,
  REQUEST_FETCH_COMMENT,
  REQUEST_REPLY_COMMENT,
  REQUEST_ADD_COMMENT,
  REQUEST_EDIT_COMMENT,
  REQUEST_DELETE_COMMENT,
  FETCH_COMMENTMORE,
  FETCH_SUBCOMMENT_MORE,
} from "@constants/action-names";
import { put, all, takeLatest, select,call} from 'redux-saga/effects';
import {apiFetchEntityDetail} from '@services/entities-api';
import {apiAddComment,
  apiEditComment,
  apiFetchCommentDetail,
  apiDeleteComment,
  apiFetchCommentDetailMore,
  apiFetchSubCommentDetailMore} from '@services/comment-api';
import validError from "@utils/msgError";
import {startLoading, stopLoading } from "@actions/loading";
import {fetchEntitySuccess, fetchCommentSuccess,fecthEntityError,fetchCommentMoreSuccess,fetchSubCommentMoreSuccess} from "@actions/entity";
import {addCommentSuccess,editCommentSuccess,deleteCommentSuccess,fetchGreyCommentDashboard} from '@actions/comments';
import { NavigationActions } from "@actions/navigate";
import {requestEntityDetail} from '@actions/entity';
import { changeStateLoading } from "@actions/loading";
import { Common } from "@utils/common";

function* fetchEntityDetail(action) {
  try{
    const {isLoading = true} = action.payload;
    if (isLoading) {
      yield put (startLoading());
      yield put(changeStateLoading({isLoading: true}));
    }
    const state = yield select();
    const {userReducer:{access_token}} = state;
    const {post_id} = action.payload;
    yield Common.sleep(300);
    const [entity, comment] = yield [call(apiFetchEntityDetail,access_token, post_id),call(apiFetchCommentDetail,access_token,post_id)];
     
    // if(!entity && !comment) {
    //   yield put (stopLoading());
    //   yield put(fecthEntityError());
    //   validError(err)
    //   return;
    // }
    const {data:{count}} = comment
    // if (isLoading) {
      yield put (stopLoading());
      yield put(changeStateLoading({isLoading: false}));
    // }
    yield put (fetchEntitySuccess(entity.data));
    yield put (fetchCommentSuccess(comment.data));
    if(count == 0){
      const {data:{post_id}} = entity; 
      const postdata = {post_id,count};
      yield put (fetchGreyCommentDashboard(postdata));
    }
  }catch(err){
    // alert(err);
  }
  
}
function* fetchEntityDetailMore(action) {
  try{
    const state = yield select();
    yield put (startLoading());
    const {userReducer:{access_token}} = state;
    const {next, post_id} = action.payload;
    const {data, err} = yield apiFetchCommentDetailMore(access_token,next, post_id);
    yield put (stopLoading());
    if(err || !data) {
      yield put(fecthEntityError());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    yield put (fetchCommentMoreSuccess(data));
  }catch(err){
    // alert(err);
  }
}

function* fetchSubCommentMoreDetail(action){
  try{
    const state = yield select();
    yield put (startLoading());
    const {userReducer:{access_token}} = state;
    const {next, post_id,comment_id} = action.payload;
    const {data, err} = yield apiFetchSubCommentDetailMore(access_token,next, post_id,comment_id);
    yield put (stopLoading());
    if(err || !data) {
      yield put(fecthEntityError());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    yield put (fetchSubCommentMoreSuccess({...data, comment_id}));
  }catch(err){
    // alert(err);
  }
}
function* actionAddComment(action) {
  try{
    yield put (startLoading());
    const state = yield select();
    const {userReducer:{access_token}} = state;
    const {data,err} = yield apiAddComment(access_token,action.payload);
    
    if(err) {
      yield put (stopLoading());
      yield put(fecthEntityError());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    yield put (stopLoading());
    yield put (addCommentSuccess(data));
  }catch(err){
    // alert(err);
  }
  
}
function* actionEditComment(action){
  try{
    yield put (startLoading());
    const state = yield select();
    const {userReducer:{access_token}} = state;
    const {comment_id} = action.payload;
    const {data,err} = yield call(apiEditComment,access_token,action.payload,comment_id);
    if(err) {
      yield put (stopLoading());
      yield put(fecthEntityError());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put (stopLoading());
    yield put (editCommentSuccess(data));
  }catch(err){
    // alert(err);
  }
}

function* actionDeleteComment(action){
  try{
    yield put (startLoading());
    const state = yield select();
    const {userReducer:{access_token}} = state;
    const {comment_id} = action.payload;
    const {data,err} = yield call(apiDeleteComment,access_token,comment_id);
    
    if(err) {
      yield put (stopLoading());
      yield put(fecthEntityError());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put (stopLoading());
    yield put (requestEntityDetail(action.payload));
  }catch(err){
    // alert(err);
  }
}
function* fetchEntitySaga() {
  yield takeLatest(REQUEST_ENTITY_DETAIL, fetchEntityDetail);
  yield takeLatest(REQUEST_ADD_COMMENT, actionAddComment)
  yield takeLatest(REQUEST_EDIT_COMMENT, actionEditComment)
  yield takeLatest(REQUEST_DELETE_COMMENT, actionDeleteComment)
  yield takeLatest(FETCH_COMMENTMORE, fetchEntityDetailMore)
  yield takeLatest(FETCH_SUBCOMMENT_MORE,fetchSubCommentMoreDetail)
}
export default fetchEntitySaga;