import Permissions from 'react-native-permissions'
import {isAuthorized, TYPE_CAMERA, TYPE_PHOTO, TYPE_RECORD, TYPE_MICROPHONE} from '@constants/permissions';
import {Alert} from 'react-native';
import {CHECK_PERMISSIONS, REQUEST_PERMISSION_DONE} from "@constants/action-names";
import {put, takeLatest, take} from 'redux-saga/effects';
import {requestPermissionDone} from '@actions/permissions';
const alertTitle = (type, statePermissions) => {
  switch(type) {
    case 'photo':
      return ['Can we access your photos?', 'We need to access your photos so that you can get picture']
    case 'camera':
        return [`Can we access your ${type}?`, `We need to access your ${type} so that you can take picture`]
    case 'microphone':
        return [`Can we access your ${type}?`, `We need to access your ${type} so that you can record video`]
  }
}
function alertPermissions(statePermissions, type) {
  return new Promise(async (resolve) => {
    if (isAuthorized(statePermissions) == true){
      resolve(true);
      return;
    }
    if (statePermissions == 'undetermined') {
      const response = await _requestPermission(type);
      if (response == 'denied') {
        resolve(false);
        return;
      }
      resolve(true);
      return;
    }
    const alertArray = alertTitle(type, statePermissions);
    Alert.alert(
      alertArray[0],
      alertArray[1],
      [
        statePermissions == 'undetermined' ? {
          text: "Don't Allow",
          onPress: () => resolve(false),
          // style: 'cancel',
        } : {
          text: 'No way',
          onPress: () => resolve(false),
          // style: 'cancel',
        },
        statePermissions == 'undetermined'? { 
            text: 'OK', onPress: async () => {
            const response = await _requestPermission(type);
            if (response == 'denied') {
              resolve(false);
              return;
            }
            resolve(true);
            return;
          }} : { text: 'Open Settings', onPress: () => {
             
            Permissions.openSettings();
            resolve(false);
          }},
      ],
    )
  });
}
function _requestPermission(type) {
  return Permissions.request(type);
}
export async function checkPermissionRequest({type}) {
   
  switch(type) {
    case TYPE_CAMERA: {
      const response = await Permissions.check(TYPE_CAMERA)
      if (isAuthorized(response)) return true;
      const checkCamera = await alertPermissions(response, TYPE_CAMERA);
      return checkCamera;
    }
    case TYPE_RECORD: {
      const response = await Permissions.check(TYPE_CAMERA)
      const responseMicro = await Permissions.check(TYPE_MICROPHONE);
      if (isAuthorized(response) && isAuthorized(responseMicro)) {
        return true;
      } else {
        const checkCamera = await alertPermissions(response, TYPE_CAMERA);
        if (checkCamera) {
          const checkMicroPhone = await alertPermissions(responseMicro, TYPE_MICROPHONE);
          return checkMicroPhone;
        }
        return checkCamera
      }
    }
    case TYPE_PHOTO: {
      const response = await Permissions.check(TYPE_PHOTO);
      if (isAuthorized(response)) return true;
      const checkPhoto = await alertPermissions(response, type)
      return checkPhoto;
    }
  }
}

function* checkPermission(action) {
  const isAuthorized = yield checkPermissionRequest(action.payload)
}

function* openPhoto(action) {
  const isAuthorized = yield checkPermissionRequest(action.payload)
}
function* openCamera(action) {
  const isAuthorized = yield checkPermissionRequest(action.payload)
}

function* permissionsSaga () {
  yield takeLatest(CHECK_PERMISSIONS, checkPermission)
}

export default permissionsSaga;