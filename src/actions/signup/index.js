import {
  FETCH_SIGNUP,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_ACTIVE_SUCCESS,
  SIGNUP_ACTIVE_FAILED,
  SIGNUP_ACTIVE
} from "@constants/action-names";
const signup = (payload) => {
   
  return {
    type: FETCH_SIGNUP,
    payload: {
      email: payload.email,
      password1: payload.password,
      password2: payload.password
    }
  }
}
const signupActive = (payload) => {
   
  return {
    type: SIGNUP_ACTIVE,
    payload: {
      isActive: true,
      confirmation_url: payload.confirmation_url
    }
  }
}
const signupSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload
})
const signupFailed = (payload) => ({
  type: SIGNUP_FAILED,
  payload
})
const signupActiveFailed = (payload) => ({
  type: SIGNUP_ACTIVE_FAILED,
  payload
})
const signupActiveSuccess = (payload) => ({
  type: SIGNUP_ACTIVE_SUCCESS,
  payload
})
export {
  signup,
  signupActive,
  signupSuccess,
  signupFailed,
  signupActiveFailed,
  signupActiveSuccess
}