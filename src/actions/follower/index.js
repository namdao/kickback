import {FETCH_FOLLOWER,FETCH_FOLLOWER_SUCCESS,REQUEST_FOLLOWING_ACTION,
  FOLLOWING_SUCCESS,UNFOLLOWING_SUCCESS,
  UPDATE_BLOCKED_USERS_STATUS

} from '@constants/action-names';

const fetchFollowerSuccess = (payload) => {
  
  return {
    type: FETCH_FOLLOWER_SUCCESS,
    payload : {...payload}
  }
}
const fetchFollower = (payload) => {
  
  return {
    type: FETCH_FOLLOWER,
    payload: {...payload}
  }
}
const requestFollowing = (payload) => {
  return {
    type: REQUEST_FOLLOWING_ACTION,
    payload: {...payload}
  }
}
const followingSuccess = (payload) => {
  return {
    type: FOLLOWING_SUCCESS,
    payload: {...payload}
  }
}
const unfollowingSuccess = (payload) => {
  return {
    type: UNFOLLOWING_SUCCESS,
    payload: {...payload}
  }
}
const updateBlockedUsersStatus = (payload) => {
  return {
    type: UPDATE_BLOCKED_USERS_STATUS,
    payload: {...payload}
  }
}
export {
  fetchFollowerSuccess,
  fetchFollower,
  requestFollowing,
  followingSuccess,
  unfollowingSuccess,
  updateBlockedUsersStatus
}