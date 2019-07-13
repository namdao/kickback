
import {
  FETCH_FOLLOWER,
  FETCH_FOLLOWER_ERROR,
  REQUEST_FOLLOWING_ACTION,
  FOLLOWING_SUCCESS,
  FOLLOWING_ERROR,UNFOLLOWING_ERROR
} from "@constants/action-names";
import { put, takeEvery,takeLatest, select} from 'redux-saga/effects';
import {apiFetchUser} from '@services/entities-api';
import {apiFollowing,apiUnFollowing} from '@services/follow-api'
import validError from "@utils/msgError";
import { startLoading, stopLoading } from "@actions/loading";
import {fetchFollowerSuccess,followingSuccess,unfollowingSuccess, fetchFollower} from '@actions/follower';
import {apiActive, apiGetUserProfile} from '@services/auth-api';
import { updateFollowingComment } from "@actions/comments";
import {
  updateListFollowStatus,updateButtonFollowListSearchBasic,
  updateButtonFollowInListSearch
} from '@actions/listFollow';
import { fetchEntities } from "@actions/entities";
import { fetchMedias } from '@actions/profile';
import { Common } from "@utils/common";

function* getFollower(action) {
  try{
    const {user_id} =  action.payload;
    yield put (startLoading());
    const state = yield select();
    const {userReducer:{access_token}} = state;
    const {data,err}= yield apiFetchUser(access_token,user_id);
    yield Common.sleep(300);
    if(err){
      yield put({ type: FETCH_FOLLOWER_ERROR });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      yield put (stopLoading());
      return;
    }
    yield put (fetchFollowerSuccess(data));
    yield put (stopLoading());

  }catch(err){
    // alert(err);
  }
}

function* followingUser(action){
  try{
    const state = yield select();
    const {userReducer:{access_token}}= state;
    const {isFollow,screen, user_to} = action.payload;
    if(!isFollow){
      const {data, err} = yield apiFollowing(access_token,{user_to:user_to});
      yield Common.sleep(300);
      if(err){
        yield put({ type: FOLLOWING_ERROR });
        // if(err.code && err.code == 101){
        //   // validError(err);
        //   return;
        // }
        validError(err)
        return;
      }
      // const value = {is_follow, user_id: user_to}
      let valueUser = {
        user_id: data.user_id,
        status: data.follow_status
      }
      yield put (followingSuccess(data));
      yield put(fetchFollower({user_id:user_to}));
      yield put(updateButtonFollowListSearchBasic(valueUser))
      if(screen == 'detailprofile'){
        yield put(updateListFollowStatus(valueUser))
      } else if (screen == 'commentList') {
        // yield put(fetchFollower({user_id:user_to}));
        yield put(updateFollowingComment({user_id:data.user_id, parent: action.payload.parent, follow_status: data.follow_status}))
      } else if (screen == 'listfollow') {
        yield put(updateListFollowStatus(valueUser))
      } else if (screen == 'searchUsers'){
        yield put(updateButtonFollowListSearchBasic(valueUser))
      }
    } else {
      const {user_to} = action.payload;
      const {data,err} = yield apiUnFollowing(access_token,user_to);
      if(err){
        yield put({ type: UNFOLLOWING_ERROR });
        // if(err.code && err.code == 101){
        //   // validError(err);
        //   return;
        // }
        validError(err)
        return;
      }
      // const value = {user_id: user_to, is_follow: false}
      let valueUser = {
        user_id: data.user_id,
        status: data.follow_status
      };
      yield put(unfollowingSuccess(data));
      yield put(fetchEntities());
      yield put(fetchFollower({user_id:user_to}));
      yield put(fetchEntities({isProfile: true, user_id: user_to}));
      yield put(updateButtonFollowListSearchBasic(valueUser));
      if(screen == 'detailprofile'){
        yield put(updateListFollowStatus(valueUser))
      } else if (screen == 'commentList') {
        // yield put(fetchFollower({user_id:user_to}));
        yield put(updateFollowingComment({user_id:data.user_id, parent: action.payload.parent, follow_status: data.follow_status}))
      } else if (screen == 'listfollow') {
        yield put(updateListFollowStatus(valueUser))
      } else if (screen == 'searchUsers'){
        yield put(updateButtonFollowListSearchBasic(valueUser))
      }
    }
  }catch(err){
    // alert(err);
  }
}

function* followerSaga() {
  yield takeLatest(FETCH_FOLLOWER, getFollower);
  yield takeLatest(REQUEST_FOLLOWING_ACTION,followingUser);
}
export default followerSaga;