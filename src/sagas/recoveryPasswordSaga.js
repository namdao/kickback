import {
    FETCH_RECOVERY_PASSWORD,
    RECOVERY_PASSWORD_FAILED,
    RECOVERY_PASSWORD_SUCCESS } from "@constants/action-names";
  
import { put, takeLatest, select } from 'redux-saga/effects';
import {apiRecoveryPassword} from '@services/auth-api';
import validError from "@utils/msgError";
import { startLoading, stopLoading } from "@actions/loading";
import { NavigationActions } from '@actions/navigate';

  function* recoveryPassword(action) {
    try{
        yield put(startLoading());
        const {data, err} = yield apiRecoveryPassword(action.payload);
  
        if(err || !data) {
           yield put (stopLoading());
           yield put ({type:RECOVERY_PASSWORD_FAILED});
        //    if(err.code && err.code == 101){
        //     // validError(err);
        //     return;
        //    }
           validError(err);
           return;
        }
        yield put (stopLoading());
        yield put ({type: RECOVERY_PASSWORD_SUCCESS,data});
        NavigationActions.navigateToVerifyRecoverPasswordScreen(action.payload);
    }catch(err){
        // alert(err);
    }
  }

  function* recoveryPasswordSaga () {
      yield takeLatest (FETCH_RECOVERY_PASSWORD,recoveryPassword);
  }
  
  export default recoveryPasswordSaga;

