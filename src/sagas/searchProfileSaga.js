import {
    //BASIC
    FETCH_LIST_SEARCH_USERS_BASIC_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_SUCCESS_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_SUCCESS_FROM_PROFILE_TAB,
    REQUEST_LIST_SEARCH_USERS_BASIC_ACTION_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_FAILED_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_FAILED_FROM_PROFILE_TAB,
    UPDATE_LOADMORE,
    //ADVANCED
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_ADVANCED_FAILED_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FAILED_FROM_PROFILE_TAB,
    REQUEST_LIST_SEARCH_USERS_ADVANCED_ACTION_FROM_PROFILE_TAB
} from "@constants/action-names";

import { put, takeEvery, takeLatest, select, call } from 'redux-saga/effects';
import {
    apiSearchUsersBasic,
    apiSearchUsersBasicMore,
    apiSearchUsersAdvanced,
    apiSearchUsersAdvancedMore
} from '@services/search-api';
import validError from "@utils/msgError";
import { k_USER_INFO } from '@constants/storage-constants';
import { startLoading, stopLoading } from "@actions/loading";
import {
    fetchListSearchUsersBasicSuccess,
    fetchListSearchUsersBasicMoreSuccess,
    fetchListSearchUsersAdvancedSuccess,
    fetchListSearchUsersAdvancedMoreSuccess
} from "@actions/search.profile";
import { NavigationActions } from "@actions/navigate";
import { changeStateLoading, changeStateLoadingMyU, updatePullRefresh } from "@actions/loading";
import {USER_PROFILE} from "../actions/follower.history";

function* getListSearchUsersBasic(action) {
    try{
        const state = yield select();
        const { userReducer, myUReducer, entitiesReducer } = state;
        const { access_token } = userReducer;
        yield put(changeStateLoading({isLoading: true}));
        const { data, err } = yield apiSearchUsersBasic(access_token, action.payload.textSearch);
        if (err) {
            yield put({ type: FETCH_LIST_SEARCH_USERS_BASIC_FAILED_FROM_PROFILE_TAB });
            yield put(changeStateLoading({isLoading: false}));
            // if(err.code && err.code == 101){
            //     // validError(err);
            //     return;
            // }
            validError(err);
            return;
        }
        yield put(fetchListSearchUsersBasicSuccess(data));
        yield put(changeStateLoading({isLoading: false}));
    }catch(err){
        // alert(err);
    }
}

function* getListSearchUsersBasicMore(action) {
    try{
        const state = yield select();
        const { userReducer, entitiesReducer } = state;
        const { access_token, } = userReducer;
        yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreSearchProfile: true}});
        const { data, err } = yield apiSearchUsersBasicMore(access_token, action.payload.next);
        yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreSearchProfile: false}});
        if (err) {
            yield put({ type: FETCH_LIST_SEARCH_USERS_BASIC_MORE_FAILED_FROM_PROFILE_TAB });
            // if(err.code && err.code == 101){
            //     // validError(err);
            //     return;
            // }
            validError(err)
            return;
        }
        yield put(fetchListSearchUsersBasicMoreSuccess(data));

    }catch(err){
        // alert(err)
    }
}

function* getListSearchUsersAdvanced(action) {
    try{
        const state = yield select();
        const { userReducer } = state;
        const { access_token } = userReducer;
        const { payload } = action;
        yield put(changeStateLoading({isLoading: true}));
        const { data, err } = yield apiSearchUsersAdvanced(access_token, payload.paramsSearch);
        if (err) {
            yield put({ type: FETCH_LIST_SEARCH_USERS_ADVANCED_FAILED_FROM_PROFILE_TAB });
            yield put(changeStateLoading({isLoading: false}));
            // if(err.code && err.code == 101){
            //     // validError(err);
            //     return;
            //   }
            validError(err);
            return;
        }
        yield put(fetchListSearchUsersAdvancedSuccess(data));
        yield put(changeStateLoading({isLoading: false}));
        // if (action.payload.fromScreen === USER_PROFILE) {
        //     NavigationActions.navigateToSearchPageFromProfile({ textSearch: '', fromScreen: action.payload.fromScreen, searchMode: action.payload.searchMode });
        // } else {
        //     NavigationActions.pop();
        // }
    }catch(err){
        // alert(err);
    }
}
function* getListSearchUsersAdvancedMore(action) {
    try{
        const state = yield select();
        const { userReducer, entitiesReducer } = state;
        const { access_token, } = userReducer;
        yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreSearchProfile: true}});
        const { data, err } = yield apiSearchUsersAdvancedMore(access_token, action.payload.next);
        yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreSearchProfile: false}});
        if (err) {
            yield put({ type: FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FAILED_FROM_PROFILE_TAB });
            // if(err.code && err.code == 101){
            //     // validError(err);
            //     return;
            // }
            validError(err)
            return;
        }
        yield put(fetchListSearchUsersAdvancedMoreSuccess(data));
    }catch(err){
        // alert(err);
    }
}
function* searchProfileSaga() {
    yield takeLatest(REQUEST_LIST_SEARCH_USERS_BASIC_ACTION_FROM_PROFILE_TAB, getListSearchUsersBasic);
    yield takeLatest(FETCH_LIST_SEARCH_USERS_BASIC_MORE_FROM_PROFILE_TAB, getListSearchUsersBasicMore);

    yield takeLatest(REQUEST_LIST_SEARCH_USERS_ADVANCED_ACTION_FROM_PROFILE_TAB, getListSearchUsersAdvanced);
    yield takeLatest(FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FROM_PROFILE_TAB, getListSearchUsersAdvancedMore);
}

export default searchProfileSaga;