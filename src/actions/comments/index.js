import {
  REQUEST_REPLY_COMMENT,
  REQUEST_ADD_COMMENT,
  REQUEST_EDIT_COMMENT,
  REQUEST_DELETE_COMMENT,
  ADD_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  EDIT_COMMENT_ERROR,
  DELETE_COMMENT_ERROR,
  UPDATE_FOLLOWER_LOCAL,
  UPDATE_FOLLOWING_COMMENT,
  FETCH_GREY_COMMENT_DASHBOARD
} from '@constants/action-names';


const updateFollowingComment = (payload = {}) => {
  return {
    type: UPDATE_FOLLOWING_COMMENT,
    payload
  }
}
const requestAddComment = (payload = {}) => {
  return {
    type: REQUEST_ADD_COMMENT,
    payload
  }
}
const requestReplyComment = (payload = {}) => {
  return {
    type: REQUEST_REPLY_COMMENT,
    payload
  }
}
const requestEditComment = (payload = {}) => {
  return {
    type: REQUEST_EDIT_COMMENT,
    payload
  }
}
const requestDeleteComment = (payload = {}) => {
  return {
    type: REQUEST_DELETE_COMMENT,
    payload
  }
}

const addCommentSuccess = (payload) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload
  }
}
const editCommentSuccess = (payload) => {
  return {
    type: EDIT_COMMENT_SUCCESS,
    payload
  }
}
const deleteCommentSuccess = (payload) => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload
  }
}
const addCommentError = (payload) => {
  return {
    type: ADD_COMMENT_ERROR,
    payload
  }
}
const editCommentError = (payload) => {
  return {
    type: EDIT_COMMENT_ERROR,
    payload
  }
}
const deleteCommentError = (payload) => {
  return {
    type: DELETE_COMMENT_ERROR,
    payload
  }
}
const updateFollowerLocal = (payload) => {
  return {
    type: UPDATE_FOLLOWER_LOCAL,
    payload
  }
}
const fetchGreyCommentDashboard = (payload) => {
  return {
    type: FETCH_GREY_COMMENT_DASHBOARD,
    payload
  }
}
export {
  requestAddComment,
  requestEditComment,
  requestDeleteComment,
  requestReplyComment,
  addCommentSuccess,
  editCommentSuccess,
  deleteCommentSuccess,
  addCommentError,
  editCommentError,
  deleteCommentError,
  updateFollowerLocal,
  updateFollowingComment,
  fetchGreyCommentDashboard
}