import {
  RESET_ALL_STATE,
  ROOT_CHANGED
} from '@constants/action-names';

const initialState = {
  screen: null,
  passProps: {

  }
};

const root = (state = initialState, action) => {
  switch (action.type) {
    case ROOT_CHANGED:
      return action.payload
    default: {
      return state;
    }
  }
};

export default root;
