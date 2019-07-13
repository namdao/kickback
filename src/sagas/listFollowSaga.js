import {
    FETCH_LIST_FOLLOWER,
    FETCH_LIST_FOLLOWING,
    FETCH_LIST_FOLLOWER_ERROR,
    FETCH_LIST_FOLLOWING_ERROR,
    REQUEST_LIST_FOLLOWER_ACTION,
    REQUEST_LIST_FOLLOWING_ACTION,
    FETCH_LIST_FOLLOWER_MORE,
    FETCH_LIST_FOLLOWING_MORE
  } from "@constants/action-names";
import { put, takeEvery,takeLatest, select} from 'redux-saga/effects';
import {apiFetchUserListFollower,
  apiFetchUserListFollowing,
  apiFetchMoreUserListFollower,
  apiFetchMoreUserListFollowing} from '@services/follow-api'
import validError from "@utils/msgError";
import { startLoading, stopLoading } from "@actions/loading";
import {fetchListFollower,
    fetchListFollowing,
    fetchListFollowerSuccess,
    fetchListFollowingSuccess,
    fetchListFollowerMoreSuccess,
    fetchListFollowingMoreSuccess,
    } from '@actions/listFollow';
import { Common } from "@utils/common";

function* getListFollower(action){
  try{
    const {user_id} =  action.payload;
    yield put (startLoading());
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data,err}= yield apiFetchUserListFollower(access_token,user_id);
    yield Common.sleep(300);
    if(err){
      yield put (stopLoading());
      yield put({ type: FETCH_LIST_FOLLOWER_ERROR });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    const isMe = (user_id == userReducer.user_id);
    const params = {...data, isMe};
    yield put (fetchListFollowerSuccess(params))
    yield put (stopLoading());
  }catch(err){
    // alert(err);
  }
}

function* getListFollowing(action){
  try{
    const {user_id} = action.payload;
    yield put (startLoading());
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data,err} = yield apiFetchUserListFollowing(access_token,user_id);
    yield Common.sleep(300);
    if(err){
      yield put (stopLoading());
      yield put({ type : FETCH_LIST_FOLLOWING_ERROR});
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    const isMe = (user_id == userReducer.user_id);
    const params = {...data, isMe};
    yield put (fetchListFollowingSuccess(params));
    yield put (stopLoading());
  }catch(err){
    // alert(err);
  }
}
function* loadMoreListFollower(action){
  try{
    const {user_id,next} = action.payload;
    yield put (startLoading());
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data, err} = yield apiFetchMoreUserListFollower(access_token,next,user_id);
    yield Common.sleep(300);
    if(err){
      yield put (stopLoading());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    const isMe = (user_id == userReducer.user_id);
    const params = {...data, isMe};
    yield put (fetchListFollowerMoreSuccess(params));
    yield put (stopLoading());
  }catch(err){
    // alert(err);
  }
}
function* loadMoreListFollowing(action){
  try{

    const {user_id,next} = action.payload;
    yield put (startLoading());
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data, err} = yield apiFetchMoreUserListFollowing(access_token,next,user_id);
    yield Common.sleep(300);
    if(err){
      yield put (stopLoading());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    const isMe = (user_id == userReducer.user_id);
    const params = {...data, isMe};
    yield put (fetchListFollowingMoreSuccess(params));
    yield put (stopLoading());
  }catch(err){
    // alert(err);
  }
}
function* listFollowSaga(){
  yield takeLatest(REQUEST_LIST_FOLLOWER_ACTION,getListFollower);
  yield takeLatest(REQUEST_LIST_FOLLOWING_ACTION,getListFollowing);
  yield takeLatest(FETCH_LIST_FOLLOWER_MORE,loadMoreListFollower);
  yield takeLatest(FETCH_LIST_FOLLOWING_MORE,loadMoreListFollowing);
}
export default listFollowSaga;
