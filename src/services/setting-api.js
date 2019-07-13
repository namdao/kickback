import {apiRequest, checkResponse} from './base-api';


export const apiUserSetting = (token,body) => {
  return apiRequest('PUT', `/users/setting/`, body, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}