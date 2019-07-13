import {
    FETCH_LIST_SEARCH_USERS_BASIC,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE,
    FETCH_LIST_SEARCH_USERS_BASIC_SUCCESS,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_SUCCESS,
    REQUEST_LIST_SEARCH_USERS_BASIC_ACTION,
    FETCH_LIST_SEARCH_USERS_BASIC_FAILED,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_FAILED,
    CLEAR_LIST_SEARCH_USERS,
    FETCH_LIST_SEARCH_USERS_ADVANCED,
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE,
    FETCH_LIST_SEARCH_USERS_ADVANCED_SUCCESS,
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_SUCCESS,
    REQUEST_LIST_SEARCH_USERS_ADVANCED_ACTION,
    FETCH_LIST_SEARCH_USERS_ADVANCED_FAILED,
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FAILED,
  } from '@constants/action-names';
  const clearListSearchUsers = (payload) => {
      return {
          type : CLEAR_LIST_SEARCH_USERS,
          payload
      }
  }
  const fetchListSearchUsersBasic = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC,
        payload
    }
}

const fetchListSearchUsersBasicSuccess = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC_SUCCESS,
        payload
    }
}

const fetchListSearchUsersBasicMore = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC_MORE,
        payload
    }
}

const fetchListSearchUsersBasicMoreSuccess = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC_MORE_SUCCESS,
        payload
    }
}

const fetchListSearchUsersBasicFailed = (payload) => {
    return {
      type : FETCH_LIST_SEARCH_USERS_BASIC_FAILED,
      payload
    }
}

const fetchListSearchUsersBasicMoreFailed = (payload) => {
  return {
    type : FETCH_LIST_SEARCH_USERS_BASIC_MORE_FAILED,
    payload
  }
}
const requestListSearchUsersBasic = (payload) => {
  return {
        type : REQUEST_LIST_SEARCH_USERS_BASIC_ACTION,
        payload
  }
}
const fetchListSearchUsersAdvanced = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_ADVANCED,
        payload
    }
}
const fetchListSearchUsersAdvancedMore = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_ADVANCED_MORE,
        payload
    }
}
const fetchListSearchUsersAdvancedSuccess = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_ADVANCED_SUCCESS,
        payload
    }
}
const fetchListSearchUsersAdvancedMoreSuccess = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_SUCCESS,
        payload
    }
}
const requestListSearchUsersAdvanced = (payload) => {
    return {
        type : REQUEST_LIST_SEARCH_USERS_ADVANCED_ACTION,
        payload
    }
}
export {
    //BASIC SEARCH
  fetchListSearchUsersBasic,
  fetchListSearchUsersBasicMore,
  fetchListSearchUsersBasicSuccess,
  fetchListSearchUsersBasicMoreSuccess,
  requestListSearchUsersBasic,
  fetchListSearchUsersBasicFailed,
  fetchListSearchUsersBasicMoreFailed,
  clearListSearchUsers,
    //ADVANCED SEARCH
    
  fetchListSearchUsersAdvanced,
  fetchListSearchUsersAdvancedMore,
  fetchListSearchUsersAdvancedSuccess,
  fetchListSearchUsersAdvancedMoreSuccess,
  requestListSearchUsersAdvanced
}