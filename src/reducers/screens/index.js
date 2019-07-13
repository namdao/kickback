import {
    RESET_ALL_STATE,
    CHANGE_SCREEN_NAME,
  } from '@constants/action-names';
  
  const initialState = {
      name: ''
  };
  
  const screensReducer = (state = initialState, action) => {
    switch (action.type) {
      case RESET_ALL_STATE: {
        return initialState;
      }
      case CHANGE_SCREEN_NAME: {
        return action.payload
      }
      default: {
        return state;
      }
    }
  };
  
  export default screensReducer;
  