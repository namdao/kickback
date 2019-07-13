import { SUCCESS_LOGIN, FAILED_LOGIN, FETCH_LOGIN, FETCH_LOGOUT, REQUEST_CHECK_VERSION } from "@constants/action-names";
import { put, takeLatest, select } from 'redux-saga/effects';
import {apiLogin, apiGetUserProfile, apiCheckVersion} from '@services/auth-api';
import validError from "@utils/msgError";
import { setKeyAsyncStorage } from "@utils/async";
import {k_USER_INFO} from '@constants/storage-constants';

import { startLoading, stopLoading } from "@actions/loading";
import { splashScreen, signUpActiveScreen, appInitialized } from "@actions/changeRoot";
import { initialUser } from "@actions/user";
import {initialReducer} from "@actions/entities"
import {AsyncStorage} from 'react-native'
import { apiLogout } from "@services/auth-api";
import {Alert,Linking} from 'react-native';

function* checkVersion(action) {
  try{
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data,err} = yield apiCheckVersion(action.payload,access_token);
    if(data && data.status == 'warning'){
          Alert.alert(
            'Warning',
            'Please update the new version for Kickback!',
            [
              {text: 'Update', onPress: () => Linking.openURL(data.url != '' ? data.url : '')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
    }
    else if(data && data.status == 'update'){
      Alert.alert(
        'Update Version',
        'Please update the new version for Kickback!',
        [
          {text: 'Update', onPress: () => Linking.openURL(data.url != '' ? data.url : '')},
        ],
      );
    }
  }catch(err){
    // alert(err);
  }
}

function* login(action) {
  try{
    yield put (startLoading());
  const {data,err} = yield apiLogin(action.payload);
   
  if (err) {
    yield put (stopLoading());
    yield put({ type: FAILED_LOGIN });
    // if(err.code && err.code == 101){
    //   // validError(err);
    //   return;
    // }
    validError(err)
    return;
  }
  const {access_token} = data;
  yield put (stopLoading());
  yield put({ type: SUCCESS_LOGIN, data });
  const dataUser = yield apiGetUserProfile(access_token);
   
  if(dataUser.err){
    yield put({ type: FAILED_LOGIN });
    // if(err.code && err.code == 101){
    //   // validError(err);
    //   return;
    // }
    validError(dataUser.err)
    return;
  }
  
  // CHECK USER TYPE IF NULL NAVIGATE TO SIGNUP ACTIVE
  if (dataUser.data) {
    const {user_type, email} = dataUser.data;
    if ((user_type == '') || (!user_type)) {
      const payload = {
        access_token: data.access_token,
        email,
        isActive: true,
        type: null
      };
      setKeyAsyncStorage(k_USER_INFO, payload);
      yield put(initialUser(payload));
      yield put(signUpActiveScreen(payload));
      return;
    }
  }
  const payload = {
    access_token: data.access_token,
    ...dataUser.data
  };
  setKeyAsyncStorage(k_USER_INFO, payload);
  yield put (initialUser({access_token, ...dataUser.data}));
  yield put(splashScreen());
  }catch(err){
    alert(err);
  }
  
}

function* logout() {
  try{
    const state = yield select();
    const {userReducer} = state;
    const {access_token, user_id} = userReducer;
    const {data, err} = yield apiLogout({token: access_token, user_id})
    yield put (startLoading());
    if (err) {
      yield put (stopLoading());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    yield put (stopLoading());
    setKeyAsyncStorage(k_USER_INFO, {});
    yield put(initialUser({}));
    yield put(appInitialized());
    yield put(initialReducer());
    yield AsyncStorage.setItem('fcmToken', '')
  }catch(err){
    alert(err);
  }
}

function* loginSaga () {
  yield takeLatest(FETCH_LOGIN, login)
  yield takeLatest(FETCH_LOGOUT, logout)
  yield takeLatest(REQUEST_CHECK_VERSION, checkVersion)
}

export default loginSaga;