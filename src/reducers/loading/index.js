import {
  CHANGE_STATE_LOADING,
  CHANGE_STATE_LOADING_MYU,
  RESET_ALL_STATE,
  UPDATE_LOADMORE,
  FETCH_ENTITIESMORE_SUCCESS,
  UPDATE_PULL_REFRESH
} from '@constants/action-names';
import {FollowerHistory} from '../../actions/follower.history';
import {NavigationActions} from "../../actions/navigate";
const initialState = {
  isPullRefresh: false,
  isLoading: false,
  isLoadingMyU: false,
  isLoadMoreHome: false,
  isLoadMoreSearch: false,
  isLoadMoreProfile: false,
  isLoadMoreSearchProfile: false
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PULL_REFRESH: {
      return {
        ...state,
        isPullRefresh: action.payload.isPullRefresh
      }
    }
    case UPDATE_LOADMORE: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case RESET_ALL_STATE: {
      return initialState
    }
    case CHANGE_STATE_LOADING: {
      return {
        ...state,
        ...action.payload
      }
    }
    case CHANGE_STATE_LOADING_MYU: {

      // let isAtHome = FollowerHistory.getIsAtHome();
      //
      // if(!state.isLoadingMyU){
      //
      //   NavigationActions.resetToHome();
      //
      //   FollowerHistory.toggleIsAtHome();
      // }

      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export default loadingReducer;
