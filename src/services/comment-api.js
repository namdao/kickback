import {apiRequest} from './base-api';

export const apiFetchCommentDetail = (token,post_id) => {
  return apiRequest('GET', `/comments/post/${post_id}/?limit=10`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return res.data})
  .catch((err) => ({err}))
}
export const apiFetchCommentDetailMore = (token, url, post_id) => {
  const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', `/comments/post/${post_id}/${endpoint}`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiFetchSubCommentDetailMore = (token, url, post_id, comment_id) => {
  const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', `/comments/post/${post_id}/sub/${comment_id}/${endpoint}`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiAddComment = (token,body) => {
  return apiRequest('POST', '/comments/', body, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiEditComment = (token,body,comment_id) => {
  return apiRequest('PUT', `/comments/${comment_id}/`, body, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}
export const apiDeleteComment = (token,comment_id) => {
  return apiRequest('DELETE', `/comments/${comment_id}/`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}