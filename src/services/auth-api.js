import {apiRequest,apiRequestUpload, checkResponse, baseURL} from './base-api';
import {client_id, client_secrect} from '@constants/clientId';
import {NativeModules} from 'react-native';
var RNUploader = NativeModules.RNUploader;

export const registrationDevice = (token, body) => {
  return apiRequest('POST', '/devices/', body, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return res
  })
  .catch((err) =>{
    return ({err})
  })
}

export const apiLogout = (body) => {
  const bodyRequest = {
    ...body,
    client_id,
  }
  var formBody = [];
  for (var property in bodyRequest) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(bodyRequest[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const optionalHeader = {'Content-Type': 'application/x-www-form-urlencoded'}
  return apiRequest('POST', '/o/revoke_token/', formBody, optionalHeader)
  .then((res) =>{
    return res
  })
  .catch((err) => {
    return {err}
  });
};

export const apiLogin = (body) => {
  const bodyRequest = {
    ...body,
    client_id,
    grant_type: 'password'
  }
  // var params = new FormData();
  // params.append('client_id', bodyRequest.client_id);
  // params.append('grant_type', bodyRequest.grant_type);
  // params.append('username', bodyRequest.username);
  // params.append('password', bodyRequest.password);
  var formBody = [];
  for (var property in bodyRequest) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(bodyRequest[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const optionalHeader = {'Content-Type': 'application/x-www-form-urlencoded'}
  return apiRequest('POST', '/o/token/', formBody, optionalHeader)
  .then((res) =>{
    return res
  })
  .catch((err) => {
    return {err}
  });
};

export const apiRegister = (body) => {
   
  // var params = new FormData();
  // params.append('email', body.email);
  // params.append('password1', body.password1);
  // params.append('password2', body.password2);
  var formBody = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const optionalHeader = {'Content-Type': 'application/x-www-form-urlencoded'}
  return apiRequest('POST', '/auth/registration/', formBody, optionalHeader)
  .then((res) => {
    return res
  })
  .catch((err) => {
     
    return ({err})
  })
};

export const apiActive = (confirmation_url) => {
  return fetch(confirmation_url).then((response) => {
    if (response.status == 200 || response.status == 201) {
      return {data: JSON.parse(response._bodyText).data};
    } else if (response.status == 400){
      return {err: JSON.parse(response._bodyText).data};
    } else {
      return {data: null};
    }
  }).catch((err) => ({err}));
}

export const apiGetImageProfile = (token, id) => (
  apiRequest('GET', `/users/${id}/media/?limit=20`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
)

export const apiGetImageProfileMore = (token, url, id) => {
  const endpoint = url.substring(url.lastIndexOf('/')+1);
  return apiRequest('GET', `/users/${id}/media/${endpoint}`,  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => res.data)
  .catch((err) => ({err}))
}


export const apiGetUserProfile = (token) => (
  apiRequest('GET', '/users/me/',  undefined, {Authorization: `Bearer ${token}`})
  .then((res) => {
    return  res.data
  })
  .catch((err) => ({err}))
)

export const apiUpdateProfile = (body, optionalHeader) => {
  return apiRequest('PUT', '/users/', body, optionalHeader)
  .then((res) => {   
    return res.data;
  })
  .catch((err) => { 
    return ({err})
  })
}

export const apiRecoveryPassword = (body) => {
  return apiRequest('POST', 'auth/forgot_password/', body)
  .then((res) => {
    return res
  })
  .catch((err) =>{
    return ({err})
  })
}

export const apiCheckVersion = (body,token) => {
  let version = body;
  return apiRequest('GET', `/version/check/?version_name=${version}`, undefined,{Authorization: `Bearer ${token}`})
  .then((res) => {
    return res.data;
  })
  .catch((err) =>{
    return ({err})
    // return {
    //   data:{
    //     type : 'warning',
    //     message:'Please update the new version for Kickback!'     
    //   }
    // }
  })
}

export const apiUploadImage = (bodyArray, optionalHeader) => {
  const formData = new FormData()
  // formData.append('get_cover', true);
  bodyArray.map((value) => {
    formData.append('file', {
      uri: value.file,
      type: value.type,
      name: value.name,
    });
  });
  return apiRequestUpload('POST', '/upload/', formData, optionalHeader)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return ({err})
  })
}

export const apiUploadImageProgress = (bodyArray, optionalHeader) => {
  return new Promise((resolve, reject) => {
    let files = bodyArray.map((object) => {
      return {
        name: 'file',
        filename: object.name,
        filepath: object.file,
        filetype: object.type
      }
    });
    let opts = {
      url: `${baseURL}/upload/`,
      files: files, 
      method: 'POST',// optional: POST or PUT
      headers: { 'Accept': 'application/json', ...optionalHeader},  // optional
      params: { },                   // optional
    };
    RNUploader.upload( opts, (err, response) => {
      if( err ){
        resolve({err});
      } else {
        let status = response.status;
        if (status == 200 || status == 201) {
          let responseString = response.data;
          let json = JSON.parse( responseString );
          resolve(json);
        } else {
          resolve({err: {}});
        }
      }
    });
  })
}
