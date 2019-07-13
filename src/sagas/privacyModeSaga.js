import {
    REQUEST_CHANGE_PRIVACY_MODE,
    CHANGE_PRIVACY_MODE_SUCCESS,
    CHANGE_PRIVACY_MODE_ERROR
  } from "@constants/action-names";
  import { put, all, takeLatest, select,call} from 'redux-saga/effects';
  import { apiUserSetting } from '@services/setting-api';
  import validError from "@utils/msgError";
  import {startLoading, stopLoading } from "@actions/loading";
  import { changePrivacyModeSuccess, changePrivacyModeError} from '@actions/privacyMode';
  import { updateUserSetting } from "@actions/privacyMode";
  import { NavigationActions } from "@actions/navigate";
  import { changeStateLoading } from "@actions/loading";
  import { getProfileInfo } from "@actions/profile";
 function* changePrivacyMode(action){
    yield put (startLoading());
    const state = yield select();
    const {userReducer:{access_token},privacyModeReducer} = state;
    const {user_id} = action.payload;
    const {data,err} = yield apiUserSetting(access_token,action.payload);
    if (err) {
      yield put (stopLoading());
      yield put (changePrivacyModeError());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put (stopLoading());
    // yield put (changePrivacyModeSuccess(data));
    yield put (updateUserSetting(data));
 }

 function* privacyModeSaga(){
    yield takeLatest(REQUEST_CHANGE_PRIVACY_MODE,changePrivacyMode);
  }
  export default privacyModeSaga;