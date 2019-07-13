import {
  FETCH_ENTITIESMORE_SUCCESS, FETCH_ENTITIESMORE,
  FETCH_ENTITIES, FETCH_ENTITIES_SUCCESS,
  RESET_ALL_STATE, DETAIL_ENTITY,
  REQUEST_LIKE_ENTITY, ENTITY_LIKE_SUCCESS,
  SORT_DASHBOARD,
  SORTDASHBOARD_CHANGE,
  FETCH_ENTITIES_PROFILE_SUCCESS,
  FETCH_ENTITIES_PROFILE,
  ENTITY_UNLIKE_SUCCESS,
  REQUEST_DELETE_POST,
  DELETE_POST_SUCCESS,
  REQUEST_BLOCKED_USERS_ACTION,
  FETCH_BLOCKED_USERS_SUCCESS,
  BLOCKED_USERS_SUCCESS,
  UNBLOCKED_USERS_SUCCESS,
} from '@constants/action-names';

const initialReducer = () => {
  return {
    type: RESET_ALL_STATE
  }
}

const sortDashBoard = (payload = {}) => {
  return {
    type: SORT_DASHBOARD,
    payload
  }
}
const sortDashBoardChange = (payload = {}) => {
  return {
    type: SORTDASHBOARD_CHANGE,
    payload
  }
}
const fetchEntitiesSuccess = (payload = {}) => {
  return {
    type: FETCH_ENTITIES_SUCCESS,
    payload
  }
}

const fetchEntitiesMoreSuccess = (payload = {}) => {
  return {
    type: FETCH_ENTITIESMORE_SUCCESS,
    payload
  }
}
const fetchEntities = (payload = {}) => {
  return {
    type: FETCH_ENTITIES,
    payload
  }
}

const fetchEntitiesProfileSuccess = (payload = {}) => {
  return {
    type: FETCH_ENTITIES_PROFILE_SUCCESS,
    payload
  }
}

const fetchEntitiesProfile = (payload = {}) => {
  return {
    type: FETCH_ENTITIES_PROFILE,
    payload
  }
}

const fetchEntitiesMore = (payload = {}) => {
  return {
    type: FETCH_ENTITIESMORE,
    payload
  }
}
const requestDeletePost = (payload = {}) => {
  return {
    type: REQUEST_DELETE_POST,
    payload
  }
}
const deletePostSuccess = (payload = {}) => {
  return {
    type: DELETE_POST_SUCCESS,
    payload
  }
}
const detailEntity = (payload) => {
  return {
    type: DETAIL_ENTITY,
    payload
  }
}
const requestLikeEntity = (payload) => {
  return {
    type: REQUEST_LIKE_ENTITY,
    payload
  }
}
const entityLikeSuccess = (payload) => {
  return {
    type: ENTITY_LIKE_SUCCESS,
    payload
  }
}
const entityUnLikeSuccess = (payload) => {
  return {
    type: ENTITY_UNLIKE_SUCCESS,
    payload
  }
}
const requestBlockedUsers = (payload) => {
  return {
      type: REQUEST_BLOCKED_USERS_ACTION,
      payload
  }
}
const fetchBlockedUsersSuccess = (payload) => {
  return {
      type: FETCH_BLOCKED_USERS_SUCCESS,
      payload
  }
}
const blockedUsersSuccess = (payload) => {
  return {
      type: BLOCKED_USERS_SUCCESS,
      payload
  }
}
const unblockedUsersSuccess = (payload) => {
  return {
      type: UNBLOCKED_USERS_SUCCESS,
      payload
  }
}

export {
  fetchEntitiesSuccess,
  fetchEntities,
  detailEntity,
  fetchEntitiesMoreSuccess,
  fetchEntitiesMore,
  requestLikeEntity,
  entityLikeSuccess,
  entityUnLikeSuccess,
  fetchEntitiesProfileSuccess,
  fetchEntitiesProfile,
  requestDeletePost,
  deletePostSuccess,
  requestBlockedUsers,
  fetchBlockedUsersSuccess,
  blockedUsersSuccess,
  unblockedUsersSuccess,
  // SORT DASH BOARD
  sortDashBoard,
  sortDashBoardChange,
  initialReducer,

}