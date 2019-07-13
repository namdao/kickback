import { combineReducers } from 'redux';
import userReducer from './user';
import root from './root';
import loadingReducer from './loading';
import entitiesReducer from './entities';
import followerReducer from './follower';
import myUReducer from './toggleMyU';
import inviteFriendsReducer from './invite.friends';
// import videoListReducer from './video';
import { mediasReducer, mediasFollowerReducer } from './medias';
import entityReducer from './entity';
import commentReducer from './comment';
import listFollowReducer from './listFollow';
import reportReducer from './report';
import listBlockedUsersReducer from './listBlockedUsers'
import searchReducer from './search';
import screensReducer from './screens';

import notifyReducer from './notify';
import privacyModeReducer from './privacyMode';
import uploadingReducer from './uploading';

import searchProfileReducer from './search.profile';
export default combineReducers({
  userReducer,
  root,
  loadingReducer,
  entitiesReducer,
  followerReducer,
  myUReducer,
  privacyModeReducer,
  // videoListReducer,
  mediasReducer,
  mediasFollowerReducer,
  entityReducer,
  commentReducer,
  listFollowReducer,
  reportReducer,
  listBlockedUsersReducer,
  searchReducer,
  inviteFriendsReducer,
  screensReducer,
  notifyReducer,
  uploadingReducer,
  searchProfileReducer
});
