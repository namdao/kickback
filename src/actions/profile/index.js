import {
  UPDATE_PROFILE,
  GET_ME,
  EDIT_PROFILE,
  FETCH_MEDIASFOLLOWER_SUCCESS,
  FETCH_MEDIASFOLLOWERMORE_SUCCESS,
  FETCH_MEDIAS_SUCCESS,
  FETCH_MEDIASMORE_SUCCESS,
  FETCH_MEDIAS,
  FETCH_MEDIASMORE
} from "@constants/action-names";
const fetchMediasFollowerSuccess = (payload) => {
  return {
    type: FETCH_MEDIASFOLLOWER_SUCCESS,
    payload
  }
};
const fetchMediasFollowerMoreSuccess = (payload) => {
  return {
    type: FETCH_MEDIASFOLLOWERMORE_SUCCESS,
    payload
  }
};
const fetchMediasSuccess = (payload) => {
  return {
    type: FETCH_MEDIAS_SUCCESS,
    payload
  }
};
const fetchMediasMoreSuccess = (payload) => {
  return {
    type: FETCH_MEDIASMORE_SUCCESS,
    payload
  }
};
const fetchMedias = (payload = {}) => {
  return {
    type: FETCH_MEDIAS,
    payload
  }
}
const fetchMediasMore = (payload = {}) => {
  return {
    type: FETCH_MEDIASMORE,
    payload
  }
}



const updateProfile = (payload) => {
  return {
    type: UPDATE_PROFILE,
    payload
  }
}
const editProfile = (payload) => {
   
  return {
    type: EDIT_PROFILE,
    payload
  }
}
const getInfoProfile = (payload = {}) => {
   
  return {
    type: GET_ME,
    payload
  }
}
export {
  updateProfile,
  getInfoProfile,
  editProfile,

  fetchMediasSuccess,
  fetchMediasMoreSuccess,
  fetchMediasFollowerSuccess,
  fetchMediasFollowerMoreSuccess,
  fetchMedias,
  fetchMediasMore
}