import { INVITE_FRIEND_REQUEST,  INVITE_FRIEND_FAILED, INVITE_FRIEND_SUCCESS} from "@constants/action-names";
import { put, takeLatest, select } from 'redux-saga/effects';
import {startLoading, stopLoading} from '@actions/loading';
import { apiInviteFriends } from '@services/invite.friend.api';
import { NavigationActions } from '@actions/navigate';

function* inviteFriend(action) {
    try{
        const state = yield select();
        const {userReducer} = state;
        const {access_token} = userReducer;
        yield put (startLoading());
        //Call invite friend API;
        const result = yield apiInviteFriends(access_token, action.payload);
        if(result && result.message === 'Success'){
            yield put({
                type: INVITE_FRIEND_SUCCESS,
                payload: result
            })
        }else{
            yield put({
                type: INVITE_FRIEND_FAILED,
                payload: result
            });
            NavigationActions.showWarningBox('Something went wrong! Please try again');
        }
        yield put (stopLoading());
    }catch(err){
        // alert(err);
    }

}

function* inviteFriendSaga () {
    yield takeLatest(INVITE_FRIEND_REQUEST, inviteFriend);
}

export default inviteFriendSaga;