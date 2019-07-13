import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILED
} from '@constants/action-names';

const createPostSuccess = (payload = {}) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload
  }
}
const createPostFailed = (payload = {}) => {
  return {
    type: CREATE_POST_FAILED,
    payload
  }
}
const createPost = (payload = {}) => {
  return {
    type: CREATE_POST,
    payload
  }
}

export {
  createPostSuccess,
  createPost,
  createPostFailed
}