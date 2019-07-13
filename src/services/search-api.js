import {apiRequest, checkResponse} from './base-api';

export const apiSearchUsersBasic = (token, keyword) => {
    return apiRequest('GET', `/users/search_basic/?keyword=${keyword}&limit=10`, undefined, {Authorization: `Bearer ${token}`})
    .then((res) => {
      return res.data})
    .catch((err) => {
      return err})
  }

export const apiSearchUsersBasicMore = (token, url) => {
  // const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', url,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return res.data})
  .catch((err) => {
    return err})
}

export const apiSearchUsersAdvanced = (token, paramsSearch) => {
  let endpoint = `/users/search_advanced/?limit=10`;
  Object.keys(paramsSearch).map((key) => {
    if (paramsSearch[key] && paramsSearch[key] != '')
    endpoint += `&${key}=${paramsSearch[key]}`;
  })
  return apiRequest('GET',endpoint, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return ({err})
  })
}

export const apiSearchUsersAdvancedMore = (token,url) => {
  const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', `/users/search_advanced/${endpoint}`, undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {   
    return res.data;
  })
  .catch((err) => { 
    return ({err})
  })
}