import {FETCH_LIST_FOLLOWER,
    FETCH_LIST_FOLLOWING,
    REQUEST_LIST_FOLLOWING_ACTION,
    REQUEST_LIST_FOLLOWER_ACTION,
    FETCH_LIST_FOLLOWER_SUCCESS,
    FETCH_LIST_FOLLOWING_SUCCESS,
    CLEAR_LIST_FOLLOW,
    FETCH_LIST_FOLLOWER_MORE,
    FETCH_LIST_FOLLOWING_MORE,
    FETCH_LIST_FOLLOWER_MORE_SUCCESS,
    FETCH_LIST_FOLLOWING_MORE_SUCCESS,
    UPDATE_BUTTON_FOLLOW_LIST_SEARCH_BASIC,
    UPDATE_BUTTON_FOLLOW_IN_LIST_SEARCH,
    UPDATE_LIST_FOLLOW_STATUS
  } from '@constants/action-names';

const updateListFollowStatus = (payload) => {
    return {
        type : UPDATE_LIST_FOLLOW_STATUS,
        payload
    }
}
const updateButtonFollowListSearchBasic = (payload) => {
    return {
        type : UPDATE_BUTTON_FOLLOW_LIST_SEARCH_BASIC,
        payload
    }
}
const updateButtonFollowInListSearch = (payload) => {
    return {
        type : UPDATE_BUTTON_FOLLOW_IN_LIST_SEARCH,
        payload
    }
}
const clearListFollow = (payload) => {
    return {
        type : CLEAR_LIST_FOLLOW,
        payload
    }
}

const fetchListFollower = (payload) => {
    return {
        type : FETCH_LIST_FOLLOWER,
        payload
    }
}

const fetchListFollowing = (payload) => {
    return {
        type : FETCH_LIST_FOLLOWING,
        payload
    }
}

const fetchListFollowerSuccess = (payload) => {
    return {
        type : FETCH_LIST_FOLLOWER_SUCCESS,
        payload
    }
}

const fetchListFollowingSuccess = (payload) => {
    return {
        type : FETCH_LIST_FOLLOWING_SUCCESS,
        payload
    }
}

const requestListFollower = (payload) => {
    return {
        type : REQUEST_LIST_FOLLOWER_ACTION,
        payload
    }
}

const requestListFollowing = (payload) => {
    return {
        type : REQUEST_LIST_FOLLOWING_ACTION,
        payload
    }
}
const fetchListFollowerMore = (payload) => {
    return {
        type : FETCH_LIST_FOLLOWER_MORE,
        payload
    }
}
const fetchListFollowingMore = (payload) => {
    return {
        type : FETCH_LIST_FOLLOWING_MORE,
        payload
    }
}
const fetchListFollowerMoreSuccess = (payload) => {
    return {
        type : FETCH_LIST_FOLLOWER_MORE_SUCCESS,
        payload
    }
}
const fetchListFollowingMoreSuccess = (payload) => {
    return {
        type : FETCH_LIST_FOLLOWING_MORE_SUCCESS,
        payload
    }
}
export {
    updateListFollowStatus,
    updateButtonFollowListSearchBasic,
    updateButtonFollowInListSearch,
    fetchListFollower,
    fetchListFollowing,
    fetchListFollowerSuccess,
    fetchListFollowingSuccess,
    requestListFollower,
    requestListFollowing,
    clearListFollow,
    fetchListFollowerMore,
    fetchListFollowingMore,
    fetchListFollowerMoreSuccess,
    fetchListFollowingMoreSuccess

}