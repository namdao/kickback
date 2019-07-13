import {
  AsyncStorage
} from "react-native";
export const stringifyData = (data) => JSON.stringify(data);
export const parseData = (data) => JSON.parse(data);

export const getKeyAsyncStorage = (key) => {
  return new Promise((resolve,reject) => {
    AsyncStorage.getItem(key).then((response)=>{
      if (response) {
        const convertJSON = parseData(response) || {};
        resolve(convertJSON);
      } else {
        resolve({});
      }
    }).catch((error)=>{
        reject(error);
    })
  })
}
export const setKeyAsyncStorage = (key,value) => {
  return new Promise((resolve,reject) => {
    const convertString = stringifyData(value);
    AsyncStorage.setItem(key, convertString).then(()=>{
        resolve();
    }).catch((error)=>{
        reject(error);
    })
  })
}

export const mergeKeyAsyncStorage = (key,value) => {
  return new Promise((resolve,reject) => {
    AsyncStorage.getItem(key).then((response)=>{
       
      if (response) {
        let convertJSON = parseData(response) || {};
        constvertJSON = {...convertJSON, ...value};
        const convertString = stringifyData(constvertJSON);
        AsyncStorage.setItem(key, convertString).then(()=>{
            resolve();
        }).catch((error)=>{
            reject(error);
        })
      } else {
        resolve(null);
      }
    }).catch((error)=>{
        reject(error);
    })
  })
}