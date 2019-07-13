import {
  RESET_ALL_STATE,
  FOLLOWING,
  FETCH_FOLLOWER_SUCCESS,
  FOLLOWING_SUCCESS,
  UPDATE_FOLLOWER_LOCAL,
  UNFOLLOWING_SUCCESS,
  UPDATE_BLOCKED_USERS_STATUS,BLOCKED_USERS_SUCCESS,UNBLOCKED_USERS_SUCCESS
} from '@constants/action-names';

const initialState = {
  user_id: null,
  username:null,
  email: null,
  gender:null,
  class_year: null,
  user_type: null,
  school: null,
  custom_school: null,
  avatar: null,
  name: null,
  short_bio: null,
  major : null,
  hobbies: null,
  whatelse: null,
  organization: null,
  followers: 0,
  following: 0,
  blocked : false,
  follow_status: '', // another user follow me or not
};
const followerReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ALL_STATE: {
      return initialState;
    }
    case FETCH_FOLLOWER_SUCCESS: {
      return action.payload
    }
    case FOLLOWING: {
      return {
        ...state,
        ...action.payload
      }
    }
    case FOLLOWING_SUCCESS: {
      return {
        ...state,
        follow_status: action.payload.follow_status,
        
      }
    }
    case UNFOLLOWING_SUCCESS: {
      return {
        ...state,
        follow_status: action.payload.follow_status
      }
    }
    case BLOCKED_USERS_SUCCESS: {
      let newState = {
        ...state,
        user_id: action.payload.user_to,
        blocked: action.payload.blocked,
        follow_status: null
      }
      if (action.payload.total_follower) newState.followers = action.payload.total_follower
      if (action.payload.total_following) newState.following = action.payload.total_following
      return newState;
    }
    case UNBLOCKED_USERS_SUCCESS: {
      let newState = {
        ...state,
        user_id: action.payload.user_to,
        blocked: action.payload.blocked,
        follow_status: null
      }
      if (action.payload.total_follower) newState.followers = action.payload.total_follower
      if (action.payload.total_following) newState.following = action.payload.total_following
      return newState;
    }
    case UPDATE_FOLLOWER_LOCAL:{
      const {user_id,username,avatar,is_follow} = action.payload;
      return{
        user_id: user_id,
        username:username,
        avatar:avatar,
        is_follow: is_follow
      }
    }
    default: {
      return state;
    }
  }
};

export default followerReducer;
