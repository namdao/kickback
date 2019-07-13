import {apiRequest, checkResponse} from './base-api';


export const apiFollowing = (token,body) => {
    return apiRequest('POST', '/users/follow/',  body, {Authorization: `Bearer ${token}`})
    .then((res) => {
      return res.data}
    )
    .catch((err) => ({err}))
  }
  
  export const apiUnFollowing = (token,user_to_id) => {
    return apiRequest('DELETE', `/users/follow/${user_to_id}/`, undefined, {Authorization: `Bearer ${token}`})
    .then((res) => {
      return res.data})
    .catch((err) => ({err}))
  }

export const apiFetchUserListFollower = (token,user_id) => {
  return apiRequest('GET', `/users/follower/${user_id}/?limit=20`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return res.data
  })
  .catch((err) => ({err}))
}
export const apiFetchMoreUserListFollower = (token, url, user_id) => {
  const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', `/users/follower/${user_id}/${endpoint}`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return res.data
  })
  .catch((err) => ({err}))
}

export const apiFetchUserListFollowing = (token,user_id) => {
  return apiRequest('GET', `/users/following/${user_id}/?limit=20`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return res.data
  })
  .catch((err) => ({err}))
}

export const apiFetchMoreUserListFollowing = (token,url,user_id) => {
  const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', `/users/following/${user_id}/${endpoint}`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return res.data
  })
  .catch((err) => ({err}))
}