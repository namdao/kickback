import { UPDATE_PROFILE, GET_ME, EDIT_PROFILE,FAILED_LOGIN } from "@constants/action-names";
import { put, takeLatest, select } from 'redux-saga/effects';
import {apiUpdateProfile, apiGetUserProfile, apiUploadImage} from '@services/auth-api';
import validError from "@utils/msgError";
import { setKeyAsyncStorage } from "@utils/async";
import {k_USER_INFO} from '@constants/storage-constants';

import { startLoading, stopLoading } from "@actions/loading";
import { splashScreen } from "@actions/changeRoot";
import { initialUser,updateProfileDashboard } from "@actions/user";
import { NavigationActions } from "@actions/navigate";

function* updateProfile(action) {
  try{
    yield put (startLoading());
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data, err} = yield apiUpdateProfile(action.payload, {'Authorization': `Bearer ${access_token}`})
    if (err) {
      yield put (stopLoading());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put (stopLoading());
    yield put (initialUser({access_token,...data}));
    setKeyAsyncStorage(k_USER_INFO, {access_token,...data})
    yield put(splashScreen());
  }catch(err){
    // alert(err);
  }
}

function* editProfile(action) {
  try{

    yield put (startLoading());
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    let dataJson = {...action.payload};
    delete dataJson.isHideToggleTab 
  
    const {data, err} = yield apiUpdateProfile(dataJson, {'Authorization': `Bearer ${access_token}`})
    
    if (err) {
      yield put (stopLoading());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err);
      return;
    }
    yield put (stopLoading());
    yield put (initialUser({access_token,...data}));
    yield put (updateProfileDashboard(data));
    NavigationActions.pop();
    if (!action.payload.isHideToggleTab) {
      NavigationActions.toggleTabs(true);
    }
    // setKeyAsyncStorage(k_USER_INFO, {access_token,...data})
    // yield put(splashScreen());
  }catch(err){
    // alert(err);
  }
}

function* getProfileInfo() {
  try{
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data,err}= yield apiGetUserProfile(access_token);
    
    if(err){
      yield put({ type: FAILED_LOGIN });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    yield put (initialUser({access_token, ...data}));
  }catch(err){
    // alert(err);
  }
}

function* profileSaga () {
  yield takeLatest(UPDATE_PROFILE, updateProfile)
  yield takeLatest(EDIT_PROFILE, editProfile)
  yield takeLatest(GET_ME, getProfileInfo)
}

export default profileSaga;