import {
    REGISTRATION_NOTIFICATION
} from "@constants/action-names";
import { put, takeLatest, select } from 'redux-saga/effects';
import {registrationDevice} from '@services/auth-api';
import validError from "@utils/msgError";
import shortid from 'shortid'

function* registrationNotification(action) {
    try{
        const state = yield select();
        const {userReducer} = state;
        const {access_token} = userReducer;
        const {fcmToken} = action.payload;
        const body = {
            registration_id: fcmToken,
            device_id: shortid(),
            type: 'ios'
        }
        const {data, err} = yield registrationDevice(access_token, body);
    }catch(err){
        // alert(err);
    }
}

function* notificationSaga () {
  yield takeLatest(REGISTRATION_NOTIFICATION, registrationNotification)
}

export default notificationSaga;