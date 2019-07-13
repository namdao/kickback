import {
  LIST_NOTIFY,
  LIST_NOTIFY_SUCCESS,
  LIST_NOTIFY_FAIL,
  LIST_NOTIFY_LOAD_MORE,
  LIST_NOTIFY_LOAD_MORE_SUCCESS,
  LIST_NOTIFY_LOAD_MORE_FAILED,
  REQUEST_FOLLOW_SUCCESS
} from "@constants/action-names";
import moment from 'moment';

const initialState = {
  listNotify:[],
  listNotifyRecent: [],
  listNotifyWeek: [],
  count: -1,
  next: '',
  hasRecent: false,
  hasThisWeek: false,
};
function checkTime(time) {
  const currentTime = moment();
  const timeStore = moment(time * 1000);

  return currentTime.diff(timeStore, 'h');
}

const addHeaderNotify = (action, state) => {
  const { results } = action.data ? action.data : { results: null };
  let dataRecent = state.listNotifyRecent;
  let dataThisWeek = state.listNotifyWeek;
  let hasRecent = state.hasRecent;
  let hasThisWeek = state.hasThisWeek;
  if (Array.isArray(results) && results.length) {
    const len = results.length;
    const diffHours = checkTime(results[0].modified);
    if (!hasRecent && diffHours <= 24) {
      dataRecent.push({
        text: 'Recent',
        isHeader: true,
      });
      hasRecent = true;
    }
    for (let i = 0; i < len; i++) {
      let diffHoursArr = checkTime(results[i].modified);
      if (!hasThisWeek) {
        if (diffHoursArr > 24) {
          dataThisWeek.push({
            text: 'This week',
            isHeader: true,
            trackId: results[i].track_id,
          });
          hasThisWeek = true;
        }
      }
      const { user, post, content_push, modified,track_type,user_follow } = results[i];
      const lenUser = Array.isArray(user) && user.length > 0 ? user.length : 0;
      if( diffHoursArr < 24){
        dataRecent.push({
        content_push: content_push,
        avatar: lenUser === 1 || lenUser === 2 ? { uri: user[0].thumbnail } : null,
        userLike2: lenUser === 2 ? { uri: user[1].thumbnail } : null,
        modified,
        isHeader: false,
        trackId: results[i].track_id,
        postLiked: results[i].post_liked,
        image: post && post.media ? { uri: post.media } : null,
        post_id: post && post.post_id ? post.post_id : '',
        track_type: track_type,
        user:user,
        status: user_follow && user_follow.status ? user_follow.status : null,
        })
      }else {
        dataThisWeek.push({
          content_push: content_push,
          avatar: lenUser === 1 || lenUser === 2 ? { uri: user[0].thumbnail } : null,
          userLike2: lenUser === 2 ? { uri: user[1].thumbnail } : null,
          modified,
          isHeader: false,
          trackId: results[i].track_id,
          postLiked: results[i].post_liked,
          image: post && post.media ? { uri: post.media } : null,
          post_id: post && post.post_id ? post.post_id : '',
          track_type: track_type,
          user:user,
          status: user_follow && user_follow.status ? user_follow.status : null,
        })
      }
    }
  }
  return {
    dataRecent,
    dataThisWeek,
    hasRecent,
    hasThisWeek
  };
}
const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_NOTIFY: {
      return initialState;
    }
    case LIST_NOTIFY_LOAD_MORE: {
      return state;
    }
    case LIST_NOTIFY_SUCCESS:
    case LIST_NOTIFY_LOAD_MORE_SUCCESS: {

      const data = addHeaderNotify(action, JSON.parse(JSON.stringify(state)));
      const dataAction = action.data ? action.data : initialState;
      const listRecent= data.dataRecent;
      const listThisWeek = data.dataThisWeek;
      const listNotify = listRecent.concat(listThisWeek);

      return {
        ...state,
        listNotify:listNotify,
        listNotifyRecent: listRecent,
        listNotifyWeek:listThisWeek,
        count: dataAction.count,
        next: dataAction.next,
        hasRecent: data.hasRecent,
        hasThisWeek: data.hasThisWeek,
      }
    }
    case LIST_NOTIFY_FAIL:
    case LIST_NOTIFY_LOAD_MORE_FAILED: {
      return state;
    }
    case REQUEST_FOLLOW_SUCCESS:{
      let dataTrack = '';
      if(action.payload.status == 'denied'){
        dataTrack = state.listNotify.filter(e => e.trackId != action.payload.trackId);
        return {
          ...state,
          listNotify: dataTrack
        }
      }
      else{
        dataTrack = state.listNotify.find(e => e.trackId == action.payload.trackId);
        if(dataTrack){
          dataTrack.status  = action.payload.status;
        }
        return {
          ...state
        }
      }
      
    }
    default: {
      return state;
    }
  }
};

export default notifyReducer;
