const HTTP_OK = 200;
import axios from 'axios';
import { k_USER_INFO } from '@constants/storage-constants'
import { store } from '../App';
import { DEVELOP_FLAG } from '@constants/action-names';
import { getKeyAsyncStorage } from '@utils/async';
import { appInitialized } from '@actions/changeRoot';

/** CHANGE URL DEVELOPMENT AND PRODUCTION
 *developFlag = true : DEVELOPMENT
 *developFlag = false : PRODUCTION
 * */
export let baseURL = '';
const linkLocal = 'http://172.16.0.70:8000/v1';
const linkDev = 'http://kickback.dev.hdwebsoft.co/v1';
const linkProduction = 'https://api.kickback-app.com/v1'
const linkAws = 'http://ec2-54-219-164-239.us-west-1.compute.amazonaws.com:8000/v1';
DEVELOP_FLAG == true ? (baseURL = linkAws) : (baseURL = linkProduction)
let urlRequest = '';

// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   if(urlRequest != config.url){
//     urlRequest = config.url;
//     return config;
//   } else {
//     return Promise.reject({err:{
//       code: 101,
//       response: {
//         data: {
//           data:{
//             error_message: 'duplicate request'
//           }
//         },
//       }
//     }});
//   }
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

/** Interceptors for catch ERROR request 
* */
axios.interceptors.response.use((response) => {
  // urlRequest= '';
  return response;
}, async (error) => {
  const originalRequest = error ? error.config : null;
  if (error && error.response && error.response.status && error.response.status === 401
    && !originalRequest._retry) {
    // originalRequest._retry = true;
    // let refreshTk = null;
    // const userInfo = await getKeyAsyncStorage(k_USER_INFO);
    //  
    // if (userInfo) {
    //   const {refreshToken: reToken} = userInfo;
    //   refreshTk = reToken;

    // return refreshToken(refreshTk)
    // .then((authToken) => {
    //   userInfo.authToken = authToken;
    //   store.dispatch(loginSuccess(userInfo));
    //   // axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
    //   originalRequest.headers['Authorization'] = 'Bearer ' + authToken;
    //   if (originalRequest.url.includes('/auth/validate/')) {
    //     originalRequest.url = originalRequest.baseURL + '/auth/validate/' + authToken;
    //   }
    //   return axios(originalRequest);
    // })
    // .catch(() => {
    //   // navigateToLogin();
    // });
    // return Promise.reject(error);
    // } else {
    // } else {
    store.dispatch(appInitialized());
    return Promise.reject(error);
    // }
  } else {
    // alert(JSON.stringify(error));
    return Promise.reject(error);
  }
});
const api = (method, endpoint, body, optionalHeaders) => {
  var options = {
    baseURL: baseURL,
    endpoint: endpoint,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...optionalHeaders
    }
  };

  return axios({
    baseURL: options.baseURL,
    headers: options.headers,
    timeout: 30000,
    ...optionalHeaders,
    method: options.method,
    url: options.endpoint,
    data: method == 'GET' ? undefined : body
  });
};
const apiUpload = (method, endpoint, body, optionalHeaders) => {
  const options = {
    baseURL: baseURL,
    endpoint: endpoint,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...optionalHeaders
    }
  };
  return axios({
    baseURL: options.baseURL,
    headers: options.headers,
    ...optionalHeaders,
    method: options.method,
    url: options.endpoint,
    data: method == 'GET' ? undefined : body,
  });
};
export const apiRequestUpload = (method, endpoint, body, optionalHeaders = {}) => (
  apiUpload(method, endpoint, body, optionalHeaders)
    .then((res) => {
      if (checkResponse(res)) {
        return res;
      } else {
        return Promise.reject(err)
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    })
);

export const apiRequest = (method, endpoint, body, optionalHeaders = {}) => {
  if (endpoint.includes('http')) {
    endpoint = endpoint.replace(baseURL, '');
  }
  return (
    api(method, endpoint, body, optionalHeaders)
      .then((res) => {
        if (checkResponse(res)) {
          return res;
        } else {
          return Promise.reject(err) 
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  );
}

export const checkResponse = (res) => {
  if (res.status === HTTP_OK || res.status == 201) {
    return true;
  }
  throw new Error(`${res.statusMessage} - ${res.result.reason}`);
};

export default api;
