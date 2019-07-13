import {
  FETCH_MEDIAS_SUCCESS,
  FETCH_MEDIASMORE_SUCCESS,
  FETCH_MEDIASFOLLOWER_SUCCESS,
  FETCH_MEDIASFOLLOWERMORE_SUCCESS,
  RESET_ALL_STATE
} from '@constants/action-names';

const initialState = {
  results: []
};

const mediasReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ALL_STATE: {
      return initialState
    }
    case FETCH_MEDIAS_SUCCESS: {
      return action.payload;
    }
    case FETCH_MEDIASMORE_SUCCESS: {
      return {
        count : action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        results: [...state.results, ...action.payload.results]
      }
    }
    default: {
      return state;
    }
  }
};
const mediasFollowerReducer = (state = {results: []}, action) => {
  switch (action.type) {
    case RESET_ALL_STATE: {
      return {
        results: []
      }
    }
    case FETCH_MEDIASFOLLOWER_SUCCESS: {
      return action.payload;
    }
    case FETCH_MEDIASFOLLOWERMORE_SUCCESS: {
      return {
        count : action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        results: [...state.results, ...action.payload.results]
      }
    }
    default: {
      return state;
    }
  }
};

export {
  mediasReducer,
  mediasFollowerReducer
}
