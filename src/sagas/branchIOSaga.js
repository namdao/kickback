import branch from 'react-native-branch';
import {eventChannel} from 'redux-saga'
import {INITIAL_BRANCHIO} from '@constants/action-names';
import { takeEvery, take, put } from 'redux-saga/effects';

import {signupActive as signUpAction} from '@actions/signup';



function* initialBranchIO (action) {
   
  // const channel = eventChannel(emitter => {
  //   branch.subscribe(({error, params}) => {
  //     emitter({params, error});
  //   })
  //   return () => {};
  // });
  // while (true) {
  //   const {params, error} = yield take(channel);
  //   if (error) return;
  //    
  //   if (!params["+clicked_branch_link"] && !params["+non_branch_link"]) {
  //     return
  //   }
  //   if (params["+non_branch_link"]) {

  //   }
  //   else {
  //     switch(params['~channel']) {
  //       case 'registration': {
  //         if (params.confirmation_url) yield put(signUpAction({confirmation_url: params.confirmation_url}));
  //         break;
  //       }
  //     }
  //   }
  // }
}
function* branchIOSaga () {
  yield takeEvery(INITIAL_BRANCHIO, initialBranchIO);
}

export default branchIOSaga;