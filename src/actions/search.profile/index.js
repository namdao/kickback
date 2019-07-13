import {
    FETCH_LIST_SEARCH_USERS_BASIC_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_SUCCESS_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_SUCCESS_FROM_PROFILE_TAB,
    REQUEST_LIST_SEARCH_USERS_BASIC_ACTION_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_FAILED_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_FAILED_FROM_PROFILE_TAB,
    CLEAR_LIST_SEARCH_USERS_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_ADVANCED_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_ADVANCED_SUCCESS_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_SUCCESS_FROM_PROFILE_TAB,
    REQUEST_LIST_SEARCH_USERS_ADVANCED_ACTION_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_ADVANCED_FAILED_FROM_PROFILE_TAB,
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FAILED_FROM_PROFILE_TAB,
} from '@constants/action-names';
const clearListSearchUsers = (payload) => {
    return {
        type : CLEAR_LIST_SEARCH_USERS_FROM_PROFILE_TAB,
        payload
    }
}
const fetchListSearchUsersBasic = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC_FROM_PROFILE_TAB,
        payload
    }
}

const fetchListSearchUsersBasicSuccess = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC_SUCCESS_FROM_PROFILE_TAB,
        payload
    }
}

const fetchListSearchUsersBasicMore = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC_MORE_FROM_PROFILE_TAB,
        payload
    }
}

const fetchListSearchUsersBasicMoreSuccess = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC_MORE_SUCCESS_FROM_PROFILE_TAB,
        payload
    }
}

const fetchListSearchUsersBasicFailed = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC_FAILED_FROM_PROFILE_TAB,
        payload
    }
}

const fetchListSearchUsersBasicMoreFailed = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_BASIC_MORE_FAILED_FROM_PROFILE_TAB,
        payload
    }
}
const requestListSearchUsersBasic = (payload) => {
    return {
        type : REQUEST_LIST_SEARCH_USERS_BASIC_ACTION_FROM_PROFILE_TAB,
        payload
    }
}
const fetchListSearchUsersAdvanced = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_ADVANCED_FROM_PROFILE_TAB,
        payload
    }
}
const fetchListSearchUsersAdvancedMore = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_FROM_PROFILE_TAB,
        payload
    }
}
const fetchListSearchUsersAdvancedSuccess = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_ADVANCED_SUCCESS_FROM_PROFILE_TAB,
        payload
    }
}
const fetchListSearchUsersAdvancedMoreSuccess = (payload) => {
    return {
        type : FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_SUCCESS_FROM_PROFILE_TAB,
        payload
    }
}
const requestListSearchUsersAdvanced = (payload) => {
    return {
        type : REQUEST_LIST_SEARCH_USERS_ADVANCED_ACTION_FROM_PROFILE_TAB,
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