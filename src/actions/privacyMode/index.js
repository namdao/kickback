import {
    REQUEST_CHANGE_PRIVACY_MODE,
    CHANGE_PRIVACY_MODE_SUCCESS,
    CHANGE_PRIVACY_MODE_ERROR,
    UPDATE_USER_SETTING
  } from "@constants/action-names";

const requestChangePrivacyMode = (payload) => {
    return {
        type : REQUEST_CHANGE_PRIVACY_MODE,
        payload
    }
}

const changePrivacyModeSuccess = (payload) => {
    return {
        type : CHANGE_PRIVACY_MODE_SUCCESS,
        payload
    }
}

const changePrivacyModeError = (payload) => {
    return {
        type : CHANGE_PRIVACY_MODE_ERROR,
        payload
    }
}

const updateUserSetting = (payload) => {
    return {
        type : UPDATE_USER_SETTING,
        payload
    }
}
export {
    requestChangePrivacyMode,
    changePrivacyModeSuccess,
    changePrivacyModeError,
    updateUserSetting
}