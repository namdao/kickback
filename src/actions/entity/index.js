import {
  REQUEST_ENTITY_DETAIL,
  REQUEST_COMMENT,
  FETCH_ENTITY_SUCCESS,
  FETCH_ENTITY_ERROR,
  FETCH_COMMENT_SUCCESS, 
  FETCH_COMMENT_ERROR,
  ENTITY_LIKE_SUCCESS,
  ENTITY_UNLIKE_SUCCESS,
  REQUEST_LIKE_ENTITY,
  FETCH_COMMENTMORE_SUCCESS,
  FETCH_COMMENTMORE,CLEAR_ENTITY_LOCAL,
  FETCH_SUBCOMMENT_MORE_SUCCESS,
  FETCH_SUBCOMMENT_MORE,
} from '@constants/action-names';

const requestEntityDetail = (payload = {}) => {
return {
    type: REQUEST_ENTITY_DETAIL,
    payload
  }
}

const requestComment = (payload = {}) => {
  return {
    type: REQUEST_COMMENT,
    payload
  }
}
const fetchEntitySuccess = (payload = {}) => {
  return {
    type: FETCH_ENTITY_SUCCESS,
    payload
  }
}
const fecthEntityError = (payload = {}) => {
  return {
    type: FETCH_ENTITY_ERROR,
    payload
  }
}
const fetchCommentSuccess = (payload = {}) => {
  return {
    type: FETCH_COMMENT_SUCCESS,
    payload
  }
}
const fetchCommentMore = (payload ={}) => {
  return {
    type: FETCH_COMMENTMORE,
    payload
  }
}
const fetchCommentMoreSuccess = (payload ={}) => {
  return {
    type: FETCH_COMMENTMORE_SUCCESS,
    payload
  }
}
const fetchSubCommentMore = (payload = {}) => {
  return {
    type: FETCH_SUBCOMMENT_MORE,
    payload
  }
}
const fetchSubCommentMoreSuccess = (payload = {}) =>{
  return {
    type: FETCH_SUBCOMMENT_MORE_SUCCESS,
    payload
  }
}
const fetchCommentError = (payload = {}) => {
  return {
    type: FETCH_COMMENT_ERROR,
    payload
  }
}
const entityLikeSuccess = (payload) => {
  return {
    type: ENTITY_LIKE_SUCCESS,
    payload
  }
}
const entityUnLikeSuccess = (payload) => {
  return {
    type: ENTITY_UNLIKE_SUCCESS,
    payload
  }
}
const requestLikeEntity = (payload) => {
  return {
    type: REQUEST_LIKE_ENTITY,
    payload
  }
}
const clearEntity = () => {
  return {
    type: CLEAR_ENTITY_LOCAL,
  }
}
export {
  requestEntityDetail,
  requestComment,
  fetchEntitySuccess,
  fecthEntityError,
  fetchCommentSuccess,
  fetchCommentError,
  entityLikeSuccess,
  entityUnLikeSuccess,
  requestLikeEntity,
  fetchCommentMoreSuccess,
  fetchCommentMore,
  fetchSubCommentMore,
  fetchSubCommentMoreSuccess,
  clearEntity,
}