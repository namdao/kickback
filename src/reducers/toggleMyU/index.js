import {
  TOGGLE_MYU,
  RESET_ALL_STATE
} from '@constants/action-names';

const initialState = {
  isMyU: false
};

const myUReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ALL_STATE: {
      return initialState
    }
    case TOGGLE_MYU: {
      return {
        isMyU: action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export default myUReducer;
