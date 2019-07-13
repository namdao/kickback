import {
    //BASIC
    FETCH_LIST_SEARCH_USERS_BASIC,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE,
    FETCH_LIST_SEARCH_USERS_BASIC_SUCCESS,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_SUCCESS,
    REQUEST_LIST_SEARCH_USERS_BASIC_ACTION,
    FETCH_LIST_SEARCH_USERS_BASIC_FAILED,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_FAILED,
    UPDATE_LOADMORE,
    //ADVANCED
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE,
    FETCH_LIST_SEARCH_USERS_ADVANCED_FAILED,
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FAILED,
    REQUEST_LIST_SEARCH_USERS_ADVANCED_ACTION
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
} from "@actions/search";
import { NavigationActions } from "@actions/navigate";
import { changeStateLoading, changeStateLoadingMyU, updatePullRefresh } from "@actions/loading";
import {HOME} from "../actions/follower.history";

function* getListSearchUsersBasic(action) {
    try{
        const state = yield select();
        const { userReducer, myUReducer, entitiesReducer } = state;
        const { access_token } = userReducer;
        yield put(changeStateLoading({isLoading: true}));
        const { data, err } = yield apiSearchUsersBasic(access_token, action.payload.textSearch);
        if (err) {
            yield put({ type: FETCH_LIST_SEARCH_USERS_BASIC_FAILED });
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
        yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreSearch: true}});
        const { data, err } = yield apiSearchUsersBasicMore(access_token, action.payload.next);
        yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreSearch: false}});
        if (err) {
            yield put({ type: FETCH_LIST_SEARCH_USERS_BASIC_MORE_FAILED });
            // if(err.code && err.code == 101){
            //     // validError(err);
            //     return;
            // }
            validError(err)
            return;
        }
        yield put(fetchListSearchUsersBasicMoreSuccess(data));
    }catch(err){
        // alert(err);
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
            yield put({ type: FETCH_LIST_SEARCH_USERS_ADVANCED_FAILED });
            yield put(changeStateLoading({isLoading: false}));
            // if(err.code && err.code == 101){
            //     // validError(err);
            //     return;
            // }
            validError(err);
            return;
        }
        yield put(fetchListSearchUsersAdvancedSuccess(data));
        yield put(changeStateLoading({isLoading: false}));
        // if (action.payload.fromScreen === HOME) {
        //     NavigationActions.navigateToSearchPage({ textSearch: '', fromScreen: action.payload.fromScreen, searchMode: action.payload.searchMode });
        // } else {
        //     // NavigationActions.pop();
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
        yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreSearch: true}});
        const { data, err } = yield apiSearchUsersAdvancedMore(access_token, action.payload.next);
        yield put({type: UPDATE_LOADMORE,  payload: {isLoadMoreSearch: false}});
        if (err) {
            yield put({ type: FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FAILED });
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
function* searchSaga() {
    yield takeLatest(REQUEST_LIST_SEARCH_USERS_BASIC_ACTION, getListSearchUsersBasic);
    yield takeLatest(FETCH_LIST_SEARCH_USERS_BASIC_MORE, getListSearchUsersBasicMore);

    yield takeLatest(REQUEST_LIST_SEARCH_USERS_ADVANCED_ACTION, getListSearchUsersAdvanced);
    yield takeLatest(FETCH_LIST_SEARCH_USERS_ADVANCED_MORE, getListSearchUsersAdvancedMore);
}

export default searchSaga;