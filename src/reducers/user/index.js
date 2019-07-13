import {
  RESET_ALL_STATE,
  INITIAL_USER,
  SIGNUP_ACTIVE,
  SUCCESS_LOGIN,
  SIGNUP_ACTIVE_SUCCESS,
  UPDATE_USER_SETTING
} from '@constants/action-names';

const initialState = {
  user_id: null,
  username: null,
  name: null,
  email: null,
  gender:null,
  class_year: null,
  user_type: null,
  school: null,
  custom_school: null,
  avatar: null,
  short_bio: null,
  major : null,
  hobbies: null,
  whatelse: null,
  followers: 0,
  following: 0,
  organization: null,
  access_token: null,
  refresh_token: null,
  expires_in: 0,
  user_setting:{}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ALL_STATE: {
      return initialState;
    }
    case INITIAL_USER: {
      return action.payload
    }
    case SIGNUP_ACTIVE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case SUCCESS_LOGIN:{
      return {
        ...state,
        ...action.payload
      }
    }
    case SIGNUP_ACTIVE_SUCCESS: {
      return {
        ...state,
        ...action.payload
      }
    }
    case UPDATE_USER_SETTING :{
      let user_setting = Object.assign({},state.user_setting);
      if(action.payload.setting_values == 'public'){
        user_setting.privacy_mode = action.payload.setting_values;
        return {
          ...state,
          user_setting,
        }
      }
      if (action.payload.setting_values == 'private'){
        user_setting.privacy_mode = action.payload.setting_values;
        return {
          ...state,
          user_setting
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
