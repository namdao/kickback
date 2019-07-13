import { START_LOADING, STOP_LOADING } from "@constants/action-names";
import { put, takeLatest } from 'redux-saga/effects';
import { changeStateLoading } from "@actions/loading";
import { NavigationActions } from "@actions/navigate";
function* startLoadingSaga() {
  // yield put(changeStateLoading({isLoading: true}));
  NavigationActions.showLoadingBox();
}
function* stopLoadingSaga() {
  // yield put(changeStateLoading({isLoading: false}));
  NavigationActions.dismissLoadingBox();
}

function* loadingSaga () {
  yield takeLatest(START_LOADING, startLoadingSaga)
  yield takeLatest(STOP_LOADING, stopLoadingSaga);
}

export default loadingSaga;