import {apiRequest, checkResponse} from './base-api';

export const apiBlockUsers = (token,body) => {
    return apiRequest('POST', '/users/block_user/',  body, {Authorization: `Bearer ${token}`})
    .then((res) => {
      return res.data}
    )
    .catch((err) => {
      return err })
  }
  
  export const apiUnblockUsers = (token,user_to) => {
    return apiRequest('DELETE', `/users/block_user/${user_to}/`, undefined, {Authorization: `Bearer ${token}`})
    .then((res) => {
      return res.data})
    .catch((err) => {
      return err })
  }

  export const apiFetchListBlockedUsers = (token) => {
    return apiRequest('GET', `/users/block_user/?limit=20`, undefined, {Authorization: `Bearer ${token}`})
    .then((res) => {
      return res.data})
    .catch((err) => {
      return err }) 
  }

  export const apiFetchListBlockedUsersMore = (token, url) => {
    const endpoint = url.substring(url.lastIndexOf('/')+1);
    return apiRequest('GET', `/users/block_user/${endpoint}`, undefined, {Authorization: `Bearer ${token}`})
    .then((res) => {
      return res.data
    })
    .catch((err) => ({err}))
  }