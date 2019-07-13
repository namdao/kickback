import {
  START_LOADING,
  STOP_LOADING,
  CHANGE_STATE_LOADING,
  CHANGE_STATE_LOADING_MYU,
  UPDATE_PULL_REFRESH
} from "@constants/action-names";
const updatePullRefresh = (payload) => ({
  type: UPDATE_PULL_REFRESH,
  payload
})
const startLoading = () => ({
  type: START_LOADING
})
const stopLoading = () => ({
  type: STOP_LOADING
})
const changeStateLoading = (payload) => ({
  type: CHANGE_STATE_LOADING,
  payload
})
const changeStateLoadingMyU = (payload) => ({
  type: CHANGE_STATE_LOADING_MYU,
  payload
})
export {
  startLoading,
  stopLoading,
  changeStateLoading,
  changeStateLoadingMyU,
  updatePullRefresh
}