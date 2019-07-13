import {
  FETCH_ENTITIES_SUCCESS, FETCH_ENTITIES_ERROR,
  FETCH_ENTITIESMORE_SUCCESS, ENTITY_LIKE_SUCCESS,
  ENTITY_UNLIKE_SUCCESS,
  SORTDASHBOARD_CHANGE,
  BACK_HOME,
  RESET_ALL_STATE, FOLLOWING_SUCCESS, UNFOLLOWING_SUCCESS,
  ADD_COMMENT_SUCCESS, FETCH_GREY_COMMENT_DASHBOARD,
  UPDATE_PROFILE_DASHBOARD,
  FETCH_ENTITIES_PROFILE_SUCCESS,
  CREATE_REPORT_SUCCESS,
  DELETE_POST_SUCCESS,
  CREATE_POST_SUCCESS
} from '@constants/action-names';
import _ from 'lodash';
import {FollowerHistory, USER_PROFILE} from '../../actions/follower.history';


const initialState = {
  // results: [],
  dashBoardData: [],
  profilePost: [],
  profileFollowingPost: [],
  // filterText: '',
  // isSearch: false,
  isProfile: false,
  isAnotherProfile: false,
  sort: 'date',
  // currentPlayingHome: [],
  // currentPlayingSearch: [],
  // currentPlayingProfile: [],
  // currentPlayingAnotherProfile: [],
  isNewCreatePost: false,
};

const entitiesReducer = (state = initialState, action) => {
  switch (action.type) {

    case BACK_HOME: {
      return {
        ...state,
        // isSearch: false,
        isProfile: false,
        isAnotherProfile: false,
        // dashBoardData: state.results,
      }
    }
    case SORTDASHBOARD_CHANGE: {
      return {
        ...state,
        sort: action.payload.sort
      }
    }
    case FETCH_ENTITIES_PROFILE_SUCCESS: {
      let data = action.payload.results;
      return {
        ...state,
        countProfilePost: action.payload.count,
        nextProfilePost: action.payload.next,
        previousProfilePost: action.payload.previous,
        profilePost: data,
        // currentPlayingProfile
      };
    }

    case FETCH_ENTITIES_SUCCESS: {

      //Check touch from MyU
      if(!FollowerHistory.getIsAtHome() && FollowerHistory.getTabActiveName() !== USER_PROFILE)
      {
        // NavigationActions.switchToTab(0);
        FollowerHistory.toggleIsAtHome();
      }
      let data = action.payload.results;
      if (action.payload && action.payload.hasOwnProperty('isProfile')) {
        return {
          ...state,
          countProfilePost: action.payload.count,
          nextProfilePost: action.payload.next,
          previousProfilePost: action.payload.previous,
          profilePost: data,
          // isSearch: false,
          isAnotherProfile: false,
          isProfile: true,
          isNewCreatePost:false
        };
      }
      if (action.payload && action.payload.hasOwnProperty('isAnotherProfile')) {
        return {
          ...state,
          countProfileFollowingPost: action.payload.count,
          nextProfileFollowingPost: action.payload.next,
          previousProfileFollowingPost: action.payload.previous,
          profileFollowingPost: data,
          // isSearch: false,
          isProfile: false,
          isNewCreatePost: false,
          isAnotherProfile: true
        };
      }
      if (state.isSearch) {
        return state;
      }
      return {
        ...state,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        // results: data,
        // isSearch: false,
        isProfile: false,
        isAnotherProfile: false,
        dashBoardData: data,
        isNewCreatePost: false,
        // currentPlayingHome
      }
    }
    case FETCH_ENTITIESMORE_SUCCESS: {
      let  data = action.payload.results;
      if (action.payload && action.payload.hasOwnProperty('isProfile')) {
        return {
          ...state,
          countProfilePost: action.payload.count,
          nextProfilePost: action.payload.next,
          previousProfile: action.payload.previous,
          profilePost: [...state.profilePost, ...data],
        }
      }
      if (action.payload && action.payload.hasOwnProperty('isAnotherProfile')) {
        return {
          ...state,
          countProfileFollowingPost: action.payload.count,
          nextProfileFollowingPost: action.payload.next,
          previousProfileFollowingPost: action.payload.previous,
          profileFollowingPost: [...state.profileFollowingPost, ...data],
        }
      }
      // if (state.isAnotherProfile) {
      //   return state;
      // }
      // if (state.isSearch) {
      //   return state;
      // }
      // if (state.isProfile) {
      //   return state;
      // }
      return {
        ...state,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        // results: [...state.results, ...data],
        dashBoardData: [...state.dashBoardData, ...data],
      }
    }
    case FETCH_ENTITIES_ERROR: {
      return state;
    }
    case RESET_ALL_STATE: {
      return initialState;
    }
    case FOLLOWING_SUCCESS: {
      const tmpState = JSON.parse(JSON.stringify(state));

      let data = tmpState.dashBoardData.filter((e) => e.user.user_id == action.payload.user_id);
      // let dataResults = tmpState.results.filter((e) => e.user.user_id == action.payload.user_id);
      let profilePost = tmpState.profilePost.filter((e) => e.user.user_id == action.payload.user_id);
      let profileFollowingPost = tmpState.profileFollowingPost.filter((e) => e.user.user_id == action.payload.user_id);
      data.map((value) => {
        value.user.follow_status = action.payload.follow_status
      })
      // dataResults.map((value) => {
      //   value.user.follow_status = action.payload.follow_status
      // })
      profilePost.map((value) => {
        value.user.follow_status = action.payload.follow_status
      })
      profileFollowingPost.map((value) => {
        value.user.follow_status = action.payload.follow_status
      })
      return {
        ...tmpState
      }
    }
    case UNFOLLOWING_SUCCESS: {
      // if(state.dashBoardData.length > 0){
      const tmpState = JSON.parse(JSON.stringify(state));
      let data = tmpState.dashBoardData.filter((e) => e.user.user_id == action.payload.user_id);
      // let dataResults = tmpState.results.filter((e) => e.user.user_id == action.payload.user_id);
      let profilePost = tmpState.profilePost.filter((e) => e.user.user_id == action.payload.user_id);
      let profileFollowingPost = tmpState.profileFollowingPost.filter((e) => e.user.user_id == action.payload.user_id);
      data.map((value) => {
        value.user.follow_status = action.payload.follow_status;
      });
      // dataResults.map((value) => {
      //   value.user.follow_status = action.payload.follow_status;
      // })
      profilePost.map((value) => {
        value.user.follow_status = action.payload.follow_status;
      })
      profileFollowingPost.map((value) => {
        value.user.follow_status = action.payload.follow_status;
      })
      return {
        ...tmpState
      }
      // }
    }
    case DELETE_POST_SUCCESS: {
      const tmpState = JSON.parse(JSON.stringify(state));
      const { post_id } = action.payload;
      const remove = (array, post_id) => {
        const idx = array.findIndex(x => x.post_id == post_id);
        return array.filter((el, index) => index !== idx);
      }
      // let dataResult = remove(tmpState.results, post_id)
      let dataDashBoard = remove(tmpState.dashBoardData, post_id)
      let dataProfileFollowing = remove(tmpState.profileFollowingPost, post_id)
      let dataProfilePost = remove(tmpState.profilePost, post_id)
      // tmpState.results = dataResult;
      tmpState.dashBoardData = dataDashBoard;
      tmpState.profileFollowingPost = dataProfileFollowing;
      tmpState.profilePost = dataProfilePost;
      return {
        ...tmpState
      }
    }
    case ENTITY_LIKE_SUCCESS: {
      // if(state.dashBoardData.length > 0){
      const tmpState = JSON.parse(JSON.stringify(state));
      let data = tmpState.dashBoardData.find(e => e.post_id == action.payload.post_id);
      // let dataResults = tmpState.results.find(e => e.post_id == action.payload.post_id);
      let profilePost = tmpState.profilePost.find(e => e.post_id == action.payload.post_id);
      let profileFollowingPost = tmpState.profileFollowingPost.find(e => e.post_id == action.payload.post_id);
      if (data) {
        data.like = action.payload.like
        data.total_like = action.payload.total_like + 1
      }
      if (profilePost) {
        profilePost.like = action.payload.like
        profilePost.total_like = action.payload.total_like + 1
      }
      if (profileFollowingPost) {
        profileFollowingPost.like = action.payload.like
        profileFollowingPost.total_like = action.payload.total_like + 1
      }
      return {
        ...tmpState
      }
      // }
    }
    case ENTITY_UNLIKE_SUCCESS: {
      // if(state.dashBoardData.length > 0){
      const tmpState = JSON.parse(JSON.stringify(state));
      let data = tmpState.dashBoardData.find(e => e.post_id == action.payload.post_id);
      // let dataResults = tmpState.results.find(e => e.post_id == action.payload.post_id);
      let profilePost = tmpState.profilePost.find(e => e.post_id == action.payload.post_id);
      let profileFollowingPost = tmpState.profileFollowingPost.find(e => e.post_id == action.payload.post_id);
      if (data) {
      data.like = action.payload.like
      data.total_like = action.payload.total_like - 1
      }
      if (profilePost) {
      profilePost.like = action.payload.like
      profilePost.total_like = action.payload.total_like - 1
      }
      if (profileFollowingPost) {
      profileFollowingPost.like = action.payload.like 
      profileFollowingPost.total_like = action.payload.total_like - 1
    }
      return {
        ...tmpState
      }
      // }
    }
    case ADD_COMMENT_SUCCESS: {
      const tmpState = JSON.parse(JSON.stringify(state));
      let data = tmpState.dashBoardData.find(e => e.post_id == action.payload.post);
      // let dataResults = tmpState.results.find(e => e.post_id == action.payload.post);
      let profilePost = tmpState.profilePost.find(e => e.post_id == action.payload.post);
      let profileFollowingPost = tmpState.profileFollowingPost.find(e => e.post_id == action.payload.post);
      // if (dataResults) dataResults.total_comments = dataResults.total_comments + 1;
      if (data) data.total_comments = data.total_comments + 1;
      if (profilePost) profilePost.total_comments = profilePost.total_comments + 1;
      if (profileFollowingPost) profileFollowingPost.total_comments = profileFollowingPost.total_comments + 1;
      return {
        ...tmpState
      }
    }
    case FETCH_GREY_COMMENT_DASHBOARD: {
      const tmpState = JSON.parse(JSON.stringify(state));
      let data = tmpState.dashBoardData.find(e => e.post_id == action.payload.post_id);
      // let dataResults = tmpState.results.find(e => e.post_id == action.payload.post_id);
      let profilePost = tmpState.profilePost.find(e => e.post_id == action.payload.post_id);
      let profileFollowingPost = tmpState.profileFollowingPost.find(e => e.post_id == action.payload.post_id);
      // if (dataResults) dataResults.total_comments = action.payload.count;
      if (data) data.total_comments = action.payload.count;
      if (profilePost) profilePost.total_comments = action.payload.count;
      if (profileFollowingPost) profileFollowingPost.total_comments = action.payload.count;
      return {
        ...tmpState
      }
    }
    case UPDATE_PROFILE_DASHBOARD: {
      const tmpState = JSON.parse(JSON.stringify(state));
      let data = tmpState.dashBoardData.filter(e => e.user.user_id == action.payload.user_id);
      // let dataResults = tmpState.results.filter(e => e.user.user_id == action.payload.user_id);
      let profilePost = tmpState.profilePost.filter(e => e.user.user_id == action.payload.user_id);
      let profileFollowingPost = tmpState.profileFollowingPost.filter(e => e.user.user_id == action.payload.user_id);
      if (data && data.length > 0) {
        data.map((value) => {
          value.user = action.payload;
        });
      }
      // if (dataResults && dataResults.length > 0) {
      //   dataResults.map((value) => {
      //     value.user = action.payload;
      //   });
      // }
      if (profilePost && profilePost.length > 0) {
        profilePost.map((value) => {

          value.user = action.payload;
        });
      }
      // if (profileFollowingPost && profileFollowingPost.length > 0) {
      //   dataResults.map((value) => {
      //     value.user = action.payload;
      //   });
      // }

      return {
        ...tmpState
      }
    }
    case CREATE_POST_SUCCESS: {
      let tmpState = JSON.parse(JSON.stringify(state));
      // tmpState.count = tmpState.count + 1;
      // tmpState.countProfilePost = tmpState.countProfilePost + 1;
      // let data = action.payload;
      // tmpState.dashBoardData = data.concat(tmpState.dashBoardData);
      // tmpState.profilePost = data.concat(tmpState.profilePost);
      // tmpState.dashBoardData = [];
      tmpState.isNewCreatePost = true;
      return {
        ...tmpState
      }
    }
    case CREATE_REPORT_SUCCESS: {
      let { dashBoardData, results, profileFollowingPost } = state;
      if (action.data && action.data.post) {
        if (dashBoardData && dashBoardData.length) {
          dashBoardData = dashBoardData.filter(item => item.post_id !== action.data.post);
        }
        // if (results && results.length) {
        //   results = results.filter(item => item.post_id !== action.data.post);
        // }
        if (profileFollowingPost && profileFollowingPost.length) {
          profileFollowingPost = profileFollowingPost.filter(item => item.post_id !== action.data.post);
        }
      }

      return {
        ...state,
        dashBoardData,
        // results,
        profileFollowingPost
      };
    }
    default: {
      return state;
    }
  }
};

export default entitiesReducer;
