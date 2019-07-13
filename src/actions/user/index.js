import {
  INITIAL_USER,
  UPDATE_PROFILE_DASHBOARD,
  REGISTRATION_NOTIFICATION
} from '@constants/action-names'
export const initialUser = (payload) => ({
  type: INITIAL_USER,
  payload
})

export const updateProfileDashboard = (payload) => ({
  type: UPDATE_PROFILE_DASHBOARD,
  payload
})

export const registrationNotification = (payload) => ({
  type: REGISTRATION_NOTIFICATION,
  payload
})