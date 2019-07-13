import { all, fork, call } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import permissionsSaga from './permissionsSaga';
import loadingSaga from './loadingSaga';
import signupSaga from './signupSaga';
import branchIOSaga from './branchIOSaga';
import profileSaga from './profileSaga';
import fetchEntitiesSaga from './entitiesSaga';
import followerSaga from './followerSaga';
import fetchEntitySaga from './entitySaga';
import createPostSaga from './createPostSaga';
import listFollowSaga from './listFollowSaga';
import recoveryPasswordSaga from './recoveryPasswordSaga';
import reportSaga from './reportSaga';
import notificationSaga from './notificationSaga';

import blockedUsersSaga from './blockedUsersSaga';
import listBlockedUsersSaga from './listBlockedUsersSaga';
import searchSaga from './searchSaga';
import inviteFriendSaga from './inviteFriendSaga';
import notifySaga from './notifySaga';
import privacyModeSaga from './privacyModeSaga';
import searchProfileSaga from './searchProfileSaga';

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(permissionsSaga),
    fork(loadingSaga),
    fork(signupSaga),
    fork(branchIOSaga),
    fork(profileSaga),
    fork(fetchEntitiesSaga),
    fork(followerSaga),
    call(fetchEntitySaga),
    fork(createPostSaga),
    fork(listFollowSaga),
    fork(recoveryPasswordSaga),
    fork(reportSaga),
    fork(notificationSaga),
    fork(blockedUsersSaga),
    fork(listBlockedUsersSaga),
    fork(searchSaga),
    fork(inviteFriendSaga),
    fork(notifySaga),
    fork(privacyModeSaga),
    fork(searchProfileSaga)
  ]);
}