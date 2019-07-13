import {
    TOGGLE_PRIVACY_MODE,
  } from '@constants/action-names';
  
  const initialState = {
    isPrivateProfile: false
  };
  
  const privacyModeReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_PRIVACY_MODE: {
        return {
          isPrivateProfile: !state.isPrivateProfile
        }
      }
      default: {
        return state;
      }
    }
  };
  
  export default privacyModeReducer;