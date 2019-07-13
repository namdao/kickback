import {
    FETCH_LIST_BLOCKED_USERS,
    FETCH_LIST_BLOCKED_USERS_SUCCESS,
    FETCH_LIST_BLOCKED_USERS_FAILED,
    FETCH_LIST_BLOCKED_USERS_MORE,
    FETCH_LIST_BLOCKED_USERS_MORE_SUCCESS,
    REQUEST_LIST_BLOCKED_USERS_ACTION,
    UPDATE_UNBLOCK_LOCAL
  } from '@constants/action-names';

const updateUnblockLocal = (payload) => {
    return {
        type : UPDATE_UNBLOCK_LOCAL,
        payload
    }
}
const fetchListBlockedUsers = (payload) => {
    return {
        type : FETCH_LIST_BLOCKED_USERS,
        payload
    }
}
const fetchListBlockedUsersSuccess = (payload) => {
    return {
        type : FETCH_LIST_BLOCKED_USERS_SUCCESS,
        payload
    }
}

const fetchListBlockedUsersFailed = (payload) => {
    return {
        type : FETCH_LIST_BLOCKED_USERS_FAILED,
        payload
    }
}

const fetchListBlockedUsersMore = (payload) => {
    return {
        type : FETCH_LIST_BLOCKED_USERS_MORE,
        payload
    }
}

const fetchListBlockedUsersMoreSuccess = (payload) => {
    return {
        type : FETCH_LIST_BLOCKED_USERS_MORE_SUCCESS,
        payload
    }
}

const requestListBlockedUsers = (payload) => {
    return {
        type : REQUEST_LIST_BLOCKED_USERS_ACTION,
        payload
    }
}

export {
    fetchListBlockedUsers,
    fetchListBlockedUsersSuccess,
    fetchListBlockedUsersFailed,
    fetchListBlockedUsersMore,
    fetchListBlockedUsersMoreSuccess,
    requestListBlockedUsers,
    updateUnblockLocal
}