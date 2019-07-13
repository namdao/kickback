import { CHECK_PERMISSIONS, REQUEST_PERMISSION_DONE } from "@constants/action-names";

const checkPermission = (payload) => {
   
  return {
    type: CHECK_PERMISSIONS,
    payload
  }
}
const requestPermissionDone = (payload) => {
   
  return {
    type: REQUEST_PERMISSION_DONE,
    payload
  }
}

export {
  checkPermission,
  requestPermissionDone
}