import { apiRequest } from './base-api';

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (let i = 0; i < Object.keys(obj).length; i += 1) {
    keyValuePairs.push(`${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(Object.values(obj)[i])}`);
  }
  return keyValuePairs.join('&');
}
export const apiGetListNotify = (token, body) => {
  const url = `/users/notification/?${objToQueryString(body)}`;
  const request = apiRequest('GET', url, undefined, { Authorization: `Bearer ${token}` })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    })
  return request;
}
 
export const apiGetListNotifyMore = (token, urlPageNext) => {
  const endpoint = urlPageNext.substring(urlPageNext.lastIndexOf('/')+1);
  return apiRequest('GET', `/users/notification/${endpoint}`, undefined, { Authorization: `Bearer ${token}` })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return err;
    })
}

export const apiRequestFollow = (token, body) =>{
  const url = `/users/follow_accept/`;
  const request = apiRequest('PUT', url, body, { Authorization: `Bearer ${token}` })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return err;
    })
  return request;
}