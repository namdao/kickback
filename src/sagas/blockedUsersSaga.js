import {
    REQUEST_BLOCKED_USERS_ACTION,
    FETCH_BLOCKED_USERS_SUCCESS,
    FETCH_BLOCKED_USERS_ERROR,
    BLOCKED_USERS_SUCCESS,
    BLOCKED_USERS_ERROR,UNBLOCKED_USERS_SUCCESS,UNBLOCKED_USERS_ERROR
  } from "@constants/action-names";
  import { requestEntityDetail } from '@actions/entity';
  import { put, takeEvery,takeLatest, select, all} from 'redux-saga/effects';
  import {apiBlockUsers,apiUnblockUsers} from '@services/blockedUsers-api';
  import validError from "@utils/msgError";
  import { startLoading, stopLoading } from "@actions/loading";
  import {fetchBlockedUsersSuccess,blockedUsersSuccess,unblockedUsersSuccess,} from '@actions/entities';
  import {updateBlockedUsersStatus} from '@actions/follower';
  import { fetchEntities } from '@actions/entities';
  import {updateUnblockLocal} from '@actions/listBlockedUsers';
  import {
    updateListFollowStatus,updateButtonFollowListSearchBasic,
    updateButtonFollowInListSearch
  } from '@actions/listFollow';
function* blockedUsers(action){
    try{
        const state = yield select();
        const {userReducer:{access_token}, entityReducer} = state;
        const {user_to, isBlocked, screen} =  action.payload;
        if(isBlocked){
            const {data,err} = yield apiBlockUsers(access_token,{user_to});
            if(err){
                yield put({type : BLOCKED_USERS_ERROR});
                // if(err.code && err.code == 101){
                //     // validError(err);
                //     return;
                //   }
                validError(err)
                return;
            }
            
            yield put (blockedUsersSuccess({user_to,blocked:true, ...data}))
            yield put (updateButtonFollowListSearchBasic({
                user_id: user_to,
                blocked : true
            }))
            yield put (fetchEntities({isProfile: true, user_id: user_to}))
            yield put (fetchEntities())
            screen == 'commentList' && (yield put(requestEntityDetail({ post_id: entityReducer.entity.post_id, isLoading: false })))
            
        } else {
            const {user_to} = action.payload;
            const {data,err} = yield apiUnblockUsers(access_token,user_to);
            if(err){
                yield put({type : UNBLOCKED_USERS_ERROR});
                // if(err.code && err.code == 101){
                //     // validError(err);
                //     return;
                // }
                validError(err)
                return;
            }
            yield put (unblockedUsersSuccess({user_to,blocked:false, ...data}));
            yield put (updateUnblockLocal({user_id:user_to}));
            yield put (updateButtonFollowListSearchBasic({ user_id:user_to, blocked : false}))
            yield put (fetchEntities({isProfile: true, user_id: user_to}));
            yield put (fetchEntities());
            screen == 'commentList' && (yield put(requestEntityDetail({ post_id: entityReducer.entity.post_id })))
        }
    }catch(err){
        // alert(err);
    }
    
}

function* blockedUsersSaga(){
    yield takeLatest(REQUEST_BLOCKED_USERS_ACTION,blockedUsers);
}

export default blockedUsersSaga;