import {
    RECOVERY_PASSWORD_SUCCESS,
    RECOVERY_PASSWORD_FAILED,
    FETCH_RECOVERY_PASSWORD
  } from "@constants/action-names";

const recoveryPassword = (payload) => ({
    type: FETCH_RECOVERY_PASSWORD,
    payload
})

const recoveryPasswordSuccess = (payload) => ({
    type: RECOVERY_PASSWORD_SUCCESS,
    payload
})

const recoveryPasswordFailed = (payload) => ({
    type: RECOVERY_PASSWORD_FAILED,
    payload
})

export {
    recoveryPassword,
    recoveryPasswordFailed,
    recoveryPasswordSuccess
}