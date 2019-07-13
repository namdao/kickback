import {apiRequest, checkResponse} from './base-api';

export const apiCreatePost = (token, body) => {
  return apiRequest('POST', '/posts/',  body, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiFetchEntitiesProfile = (token, user_id) => {
  return apiRequest('GET', `/users/${user_id}/post/`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiFetchEntitiesMoreProfile = (token, url, user_id) => {
  const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', `/users/${user_id}/post/${endpoint}`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiFetchEntitiesSearch = (token, key) => {
  
  return apiRequest('GET', `/posts/search/?key=${key}`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiFetchEntitiesMoreSearch = (token, url) => {
  const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', `/posts/search/${endpoint}`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiFetchUser = (token,uid) => (
  apiRequest('GET', `/users/${uid}/`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) =>{ 
    
    return res.data})
  .catch((err) => ({err}))
)

export const apiFetchEntities = (token, isMyU = false, sort = 'date') => {
  let endpoint = isMyU ? '/posts/?mode=myu' : '/posts/?limit=20&&mode=open';
  endpoint = sort ? `${endpoint}&order=${sort}` : endpoint;
  return apiRequest('GET', endpoint,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return ({err})
  })
}

export const apiFetchEntitiesMore = (token, url) => {
  const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', `/posts/${endpoint}`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiLikeEntity = (token,body) => {
  return apiRequest('POST', '/posts/like/',  body, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiUnLikeEntity = (token,post_id) => {
  return apiRequest('DELETE', `/posts/like/${post_id}/`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiFetchEntityDetail = (token,post_id) => {
  return apiRequest('GET', `/posts/${post_id}/`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}

export const apiDeletePostEntity = (token,post_id) => {
  return apiRequest('DELETE', `/posts/${post_id}/`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) =>{
  return res.data
})
  .catch((err) => ({err}))
}

