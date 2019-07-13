import {
  LIST_NOTIFY,
  LIST_NOTIFY_FAIL,
  LIST_NOTIFY_SUCCESS,
  LIST_NOTIFY_LOAD_MORE,
  REQUEST_FOLLOW,
  REQUEST_FOLLOW_SUCCESS
} from '@constants/action-names'
const getListNotify = (payload) => ({
  type: LIST_NOTIFY,
  payload
})
const getListNotifySuccess = (payload) => ({
  type: LIST_NOTIFY_SUCCESS,
  payload
})
const getListNotifyFail = (payload) => ({
  type: LIST_NOTIFY_FAIL,
  payload
})
const getListNotifyLoadMore = (payload) => ({
  type: LIST_NOTIFY_LOAD_MORE,
  payload
})
const requestFollowNotify = (payload) => ({
  type: REQUEST_FOLLOW,
  payload
})
const requestFollowSuccess = (payload)=>({
  type:REQUEST_FOLLOW_SUCCESS,
  payload
})
const requestFollowFail = (payload) =>({
  type:REQUEST_FOLLOW_FAIL,
  payload
})
export {
  getListNotify,
  getListNotifySuccess,
  getListNotifyFail,
  getListNotifyLoadMore,
  requestFollowNotify,
  requestFollowSuccess,
  requestFollowFail
}
