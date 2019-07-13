import { FETCH_LOGIN,REQUEST_CHECK_VERSION } from "@constants/action-names";

const login = (payload) => {
   
  return {
    type: FETCH_LOGIN,
    payload: {
      username: payload.email,
      password: payload.password
    }
  }
}
const checkVersion = (payload) => {
  return {
    type: REQUEST_CHECK_VERSION,
    payload
  }
}
export {
   login,
   checkVersion
}