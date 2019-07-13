import {
  FETCH_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_ACTIVE,
  SIGNUP_ACTIVE_SUCCESS } from "@constants/action-names";

import { put, takeLatest, select } from 'redux-saga/effects';
import {apiRegister} from '@services/auth-api';
import validError from "@utils/msgError";
import { startLoading, stopLoading } from "@actions/loading";
import { setKeyAsyncStorage, getKeyAsyncStorage } from "@utils/async";
import {k_USER_INFO, k_USER_FIRST_TIME} from '@constants/storage-constants';
import { NavigationActions } from "@actions/navigate";
import {apiActive, apiGetUserProfile} from '@services/auth-api';
import { signUpActiveScreen } from "@actions/changeRoot";
import { initialUser } from "@actions/user";

function* signup(action) {
  try{
    yield put (startLoading());
    const {data, err} = yield apiRegister(action.payload)
     
    if (err || !data) {
      yield put (stopLoading());
      yield put({ type: SIGNUP_FAILED });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    yield put (stopLoading());
    yield put({ type: SIGNUP_SUCCESS, data });
     
    NavigationActions.navigateToSignUpAfter(action.payload);
  }catch(err){
    alert(err);
  }
}
// ACTIVE ACCOUNT
function* signUpActive (action) {
  try{
    // yield put(signupActiveSuccess(action.payload));
    const {confirmation_url} = action.payload;
    const {data, err} = yield apiActive(confirmation_url);
    
    if (err || !data) {
      yield put (stopLoading());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    const dataFull = {
      // ...data,
      access_token: data.access_token,
      email: data.email,
      isActive: true,
      type: null
    };
    setKeyAsyncStorage(k_USER_INFO, dataFull);
    yield put(initialUser(dataFull));
    // NavigationActions.navigateToCreateProfile(dataFull);
    yield put(signUpActiveScreen(dataFull));
  }catch(err){
    alert(err);
  }
}

// SET TYPE ACCOUNT
function* signUpSetTypeAccount (action) {
  try{
    yield put (startLoading());
    const state = yield select();
    
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {data,err}= yield apiGetUserProfile(access_token);
    if (err || !data) {
      yield put (stopLoading());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    yield put (stopLoading());
    setKeyAsyncStorage(k_USER_INFO, {...action.payload, ...data});
    yield put(initialUser({...action.payload, ...data}));
    NavigationActions.navigateToCreateProfile({...action.payload, ...data, userData: userReducer});
  }catch(err){
    alert(err);
  }
}

function* signupSaga () {
  yield takeLatest(FETCH_SIGNUP, signup);
  yield takeLatest(SIGNUP_ACTIVE, signUpActive);
  yield takeLatest(SIGNUP_ACTIVE_SUCCESS, signUpSetTypeAccount);
}

export default signupSaga;