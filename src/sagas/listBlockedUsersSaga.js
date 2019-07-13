import {
    FETCH_LIST_BLOCKED_USERS,
    FETCH_LIST_BLOCKED_USERS_SUCCESS,
    FETCH_LIST_BLOCKED_USERS_FAILED,
    FETCH_LIST_BLOCKED_USERS_MORE,
    FETCH_LIST_BLOCKED_USERS_MORE_SUCCESS,
    REQUEST_LIST_BLOCKED_USERS_ACTION,

  } from "@constants/action-names";
  import { put, takeEvery,takeLatest, select} from 'redux-saga/effects';
  import { apiFetchListBlockedUsers, apiFetchListBlockedUsersMore} from '@services/blockedUsers-api'
  import validError from "@utils/msgError";
  import { startLoading, stopLoading } from "@actions/loading";
  import { fetchListBlockedUsersSuccess,
    fetchListBlockedUsersMoreSuccess,
    } from '@actions/listBlockedUsers';

function* getListBlockedUsers(action){
  try{
    yield put (startLoading());
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data,err}= yield apiFetchListBlockedUsers(access_token);
    if(err){
      yield put (stopLoading());
      yield put({ type: FETCH_LIST_BLOCKED_USERS_FAILED });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put (fetchListBlockedUsersSuccess(data));
    yield put (stopLoading());
  }catch(err){
    // alert(err);
  }
}

function* loadMoreListBlockedUsers(action){
  try{
    const {next} = action.payload;
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data, err} = yield apiFetchListBlockedUsersMore(access_token,next);
    if(err){
      validError(err);
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      return;
    }
    yield put (fetchListBlockedUsersMoreSuccess(data));
  }catch(err){
    // alert(err);
  }
}

function* listBlockedUsersSaga(){
    yield takeLatest(REQUEST_LIST_BLOCKED_USERS_ACTION,getListBlockedUsers);
    yield takeLatest(FETCH_LIST_BLOCKED_USERS_MORE,loadMoreListBlockedUsers);
}

export default listBlockedUsersSaga;