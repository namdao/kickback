import {
  FETCH_ENTITIES,
  FETCH_ENTITIESMORE,
  FETCH_ENTITIES_ERROR,
  DETAIL_ENTITY,
  REQUEST_LIKE_ENTITY,
  REQUEST_UNLIKE_ENTITY,
  FETCH_MEDIAS_ERROR,
  UPDATE_LOADMORE,
  FETCH_MEDIAS,
  FETCH_MEDIASMORE,
  ENTITY_LIKE_ERROR,
  SORT_DASHBOARD,
  FETCH_ENTITIES_PROFILE,
  REQUEST_DELETE_POST,
} from "@constants/action-names";
import { put, takeEvery,takeLatest, select,call, all} from 'redux-saga/effects';
import {apiFetchEntities,
  apiLikeEntity,apiUnLikeEntity, apiFetchEntitiesMore} from '@services/entities-api';
import validError from "@utils/msgError";
import {k_USER_INFO} from '@constants/storage-constants';
import { startLoading, stopLoading } from "@actions/loading";
import { fetchEntitiesSuccess,
  fetchEntitiesMoreSuccess,
  entityLikeSuccess,
  entityUnLikeSuccess,
  sortDashBoardChange,
  fetchEntitiesProfileSuccess,
  deletePostSuccess,
  } from "@actions/entities";
import { NavigationActions } from "@actions/navigate";
import { apiGetImageProfile, apiGetImageProfileMore } from "@services/auth-api";
import { fetchMediasSuccess, fetchMediasMoreSuccess, fetchMediasFollowerMoreSuccess, fetchMediasFollowerSuccess } from "@actions/profile";
import { changeStateLoading, changeStateLoadingMyU, updatePullRefresh } from "@actions/loading";
import { apiFetchEntitiesProfile, apiFetchEntitiesMoreProfile,apiDeletePostEntity } from "@services/entities-api";
import {fetchEntities, fetchEntitiesProfile, initialReducer} from "../actions/entities";
import { clearEntity } from "../actions/entity";
import { Common } from "@utils/common";
function* getMedias(action) {
  try{
    // yield put (startLoading());
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;

    let {data,err}= yield call(apiGetImageProfile,access_token, action.payload.id);
    
    if(err) {
      // yield put (stopLoading());
      yield put({ type: FETCH_MEDIAS_ERROR });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }

    // yield put (stopLoading());

    if (action.payload.id != userReducer.user_id) {
      yield put (fetchMediasFollowerSuccess(data));
    } else {
      yield put (fetchMediasSuccess(data));
    }
  }catch(error){
    alert(error);
  }
  
}

function* getMediasMore(action) {
  try{
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    let {data,err}= yield apiGetImageProfileMore(access_token, action.payload.next, action.payload.id);
    if(err){
      yield put({ type: FETCH_MEDIAS_ERROR });
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    if (action.payload.id != userReducer.user_id) {
      yield put (fetchMediasFollowerMoreSuccess(data));
    } else {
      yield put (fetchMediasMoreSuccess(data));
    }
  }catch(error){
    alert(error);
  }
  
}

function* getEntitiesProfile() {
  try{
    const state = yield select();
    const {userReducer} = state;
    const {access_token} = userReducer;
    const {user_id} = userReducer;
    yield put(changeStateLoading({isLoading: true}));
    let {data,err}= yield call(apiFetchEntitiesProfile, access_token, user_id);
    if(err || !data){
      yield put({ type: FETCH_ENTITIES_ERROR });
      yield put(changeStateLoading({isLoading: false}));
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    yield put (fetchEntitiesProfileSuccess(data));
    yield put(changeStateLoading({isLoading: false}));
  }catch(error){
    alert(error);
  }
  
}

function* getEntities(action) {
  try{
    const state = yield select();
    const {userReducer, myUReducer, entitiesReducer} = state;
    const {access_token} = userReducer;
    const {isSearch, textSearch, isProfile, user_id} = action.payload;
    if (action.payload.scrollToTop) {
      action.payload.scrollToTop();
    }

    // if (isSearch) {
    //   yield put(changeStateLoading({isLoading: true}));
    //   let {data,err}= yield call(apiFetchEntitiesSearch, access_token, textSearch);
    //   if(err || !data){
    //     yield put({ type: FETCH_ENTITIES_ERROR });
    //     yield put(changeStateLoading({isLoading: false}));
    //     validError(err)
    //     return;
    //   }
    //
    //   yield put (fetchEntitiesSuccess({...data, isSearch}));
    //   yield put(changeStateLoading({isLoading: false}));
    // } else if (isProfile) {
    if(isProfile){
      yield put(changeStateLoading({isLoading: true}));
      let {data,err}= yield call(apiFetchEntitiesProfile, access_token, user_id);
      if(err || !data){
        yield put({ type: FETCH_ENTITIES_ERROR });
        yield put(changeStateLoading({isLoading: false}));
        // if(err.code && err.code == 101){
        //   // validError(err);
        //   return;
        // }
        validError(err)
        return;
      }
      if (userReducer.user_id == user_id) {
        yield put (fetchEntitiesSuccess({...data, isProfile}));
      } else {
        yield put (fetchEntitiesSuccess({...data, isAnotherProfile: true}));
      }
      yield put(changeStateLoading({isLoading: false}));
    } else {

      const {payload} = action;
      let actions = []
      !payload.isPullRefresh && (
        actions.push(put(changeStateLoading({isLoading: true})))
      );
      payload.isPullRefresh && (
        actions.push(put(updatePullRefresh({isPullRefresh: true})))
      );
      
      if (payload.hasOwnProperty('isMyU')) {
        actions.push(put(changeStateLoadingMyU({isLoadingMyU: true})));
      }
      yield all(actions);
      let {data,err}= yield call(apiFetchEntities,access_token,
      payload.hasOwnProperty('isMyU') ? payload.isMyU : myUReducer.isMyU,
      payload.hasOwnProperty('sort') ? payload.sort : entitiesReducer.sort);
      actions = [];
      // !payload.isPullRefresh && (yield put({type: STOP_ALL_VIDEO_HOME}));
      yield put(changeStateLoadingMyU({isLoadingMyU: false}));
      if(payload.isPullRefresh) {
        // yield put({type: STOP_ALL_VIDEO_HOME})
        yield put(updatePullRefresh({isPullRefresh: false}))
      };
      if(err || !data){
        yield put({ type: FETCH_ENTITIES_ERROR });
        // if(err.code && err.code == 101){
        //   // validError(err);
        //   return;
        // }
        validError(err)
        return;
      }
      
      // Check Option Sort
      if (payload.sort) {
        yield put(sortDashBoardChange({sort: action.payload.sort}));
        setTimeout(() => {
          action.payload.scrollToTop();
        }, 500);
      }
      // yield put(clearEntity())
      yield put (fetchEntitiesSuccess(data));
      if (payload.hasOwnProperty('isMyU')) {
        NavigationActions.switchToTab(0);
      }
      yield put(changeStateLoading({isLoading: false}));
      // payload.isPullRefresh && (
      //   yield put(playCurrentVideo({}))
      // )
    }
  }catch(error){
    alert(error);
  }
}

function* loadMoreEntities(action) {
  try{
    const state = yield select();
    const {userReducer, entitiesReducer} = state;
    const {access_token,} = userReducer;
    const {isSearch, user_id, isProfile} = action.payload;
    if (isProfile) {
      yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreProfile: true}});
      const isMe = userReducer.user_id == user_id;
      const {nextProfilePost, nextProfileFollowingPost} = action.payload;
      let {data,err}= yield apiFetchEntitiesMoreProfile(access_token, isMe ? nextProfilePost : nextProfileFollowingPost, user_id);
      yield put({type: UPDATE_LOADMORE, payload: {isLoadMoreProfile: false}});
      if(err || !data){
        // if(err.code && err.code == 101){
        //   // validError(err);
        //   return;
        // }
        validError(err)
        return;
      }
      if (isMe) {
        yield put (fetchEntitiesMoreSuccess({...data, isProfile}));
      } else {
        yield put (fetchEntitiesMoreSuccess({...data, isAnotherProfile: true}));
      }
    } else {
      yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreHome: true}});
      let {data,err}= yield apiFetchEntitiesMore(access_token, action.payload.next);
      if(err || !data){
        // if(err.code && err.code == 101){
        //   // validError(err);
        //   return;
        // }
        validError(err)
        return;
      }
      yield put (fetchEntitiesMoreSuccess(data));
      yield Common.sleep(300);
      yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreHome: false}});
    }
  }catch(error){
    alert(error);
  }
  
}

function* detailEntity(action) {
  NavigationActions.toggleTabs(false);
  NavigationActions.navigateToEntityDetail(action.payload);
  // NavigationActions.showCommingSoonBox('COMING SOON');
}
function* deletePostEntities(action){
  try{
    yield put (startLoading());
    const state = yield select();
    const {userReducer:{access_token, user_id},entitiesReducer:{results,dashBoardData,profilePost}} = state;
    const {post_id} = action.payload;
    // yield put (pauseAllItem());
    const {data,err} = yield apiDeletePostEntity(access_token,post_id);
    if(err) {
      yield put (stopLoading());
      // if(err.code && err.code == 101){
      //   // validError(err);
      //   return;
      // }
      validError(err)
      return;
    }
    // const idx_result = results.findIndex(e => e.post_id == post_id);
    // const idx_dashboard = dashBoardData.findIndex(e => e.post_id == post_id);
    // const idx_profile = profilePost.findIndex(e => e.post_id == post_id);
    // const payload = {
    //   idx_result: idx_result,
    //   idx_dashboard: idx_dashboard,
    //   idx_profile:idx_profile
    // }
    yield put (deletePostSuccess({post_id}));
    yield put(fetchEntities());
    yield put(fetchEntities({ isProfile: true, user_id }));
    // yield put (setPlayIndex(payload));
    yield put (stopLoading());
  }catch(error){
    alert(err)
  }
  
}
function* likeEntities(action){
  try{
    const state = yield select();
    const {userReducer:{access_token}}= state;
    const {isLike,total_like,post} = action.payload;
    if(!isLike){
      let dataLike ={
        post_id: post,
        like:true,
        total_like: total_like
      };
      yield dataLike['total_like'] = total_like;
      yield put (entityLikeSuccess(dataLike));
      let {err} = yield apiLikeEntity(access_token,{post:action.payload.post});
      if(err){
        yield put({ type: ENTITY_LIKE_ERROR });
        // validError(err)
        return;
      }
      // data.like = true;
    } else {
      let dataUnLike ={
        post_id: post,
        like:false,
        total_like: total_like
      };
      yield put (entityUnLikeSuccess(dataUnLike));
      yield dataUnLike['total_like'] = total_like;
      const {err} = yield apiUnLikeEntity(access_token,post);
      if(err){
        yield put({ type: ENTITY_UNLIKE_ERROR });
        // validError(err)
        return;
      }
    } 
  }catch(err){
    // alert(err);
  }
}

function* fetchEntitiesSaga() {
  yield takeLatest(SORT_DASHBOARD, getEntities);

  yield takeLatest(FETCH_MEDIAS, getMedias);
  yield takeLatest(FETCH_MEDIASMORE, getMediasMore);
  yield takeEvery(FETCH_ENTITIES, getEntities);
  yield takeLatest(DETAIL_ENTITY, detailEntity)
  yield takeLatest(FETCH_ENTITIESMORE, loadMoreEntities);
  yield takeLatest(REQUEST_LIKE_ENTITY,likeEntities);

  yield takeLatest(FETCH_ENTITIES_PROFILE,getEntitiesProfile);

  yield takeLatest(REQUEST_DELETE_POST,deletePostEntities);
}

export default fetchEntitiesSaga;