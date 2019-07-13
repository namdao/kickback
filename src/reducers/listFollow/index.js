import {FETCH_LIST_FOLLOWER,
    FETCH_LIST_FOLLOWING,
    FETCH_LIST_FOLLOWING_SUCCESS,
    FETCH_LIST_FOLLOWER_SUCCESS,
    CLEAR_LIST_FOLLOW,
    FETCH_LIST_FOLLOWER_MORE_SUCCESS,
    FETCH_LIST_FOLLOWING_MORE_SUCCESS,
    UPDATE_LIST_FOLLOW_STATUS,
    RESET_ALL_STATE,
    UPDATE_BUTTON_FOLLOW_LIST_SEARCH_BASIC
} from '@constants/action-names';
// interface typeObject {
//     user_id: string,
//     username: string,
//     name: string,
//     first_name: string,
//     last_name: string,
//     is_follow?: boolean,
//     avatar?: string,
// }

const initialState = {
    data: [],
    dataFriend: [],
}

const listFollowReducer = (state = initialState , action) => {
    switch (action.type) {
        case RESET_ALL_STATE: {
            return initialState
        }
        case FETCH_LIST_FOLLOWER_SUCCESS:
        case FETCH_LIST_FOLLOWING_SUCCESS: {
            if (action.payload.isMe) {
                return {
                    ...state,
                    data: action.payload.results,
                    count: action.payload.count,
                    prev: action.payload.previous,
                    next: action.payload.next,
                }
            } else {
                return {
                    ...state,
                    dataFriend: action.payload.results,
                    countDataFriend: action.payload.count,
                    prevDataFriend: action.payload.previous,
                    nextDataFriend: action.payload.next,
                }
            }
        }
        case FETCH_LIST_FOLLOWER_MORE_SUCCESS:
        case FETCH_LIST_FOLLOWING_MORE_SUCCESS : {
            if (action.payload.isMe) {
                const {results} = action.payload;
                let resultFull = [...state.data, ...results];
                return {
                    ...state,
                    count : action.payload.count,
                    next : action.payload.next,
                    prev : action.payload.previous,
                    data : resultFull
                }
            } else {
                const {results} = action.payload;
                let resultFull = [...state.dataFriend, ...results];
                return {
                    ...state,
                    countDataFriend : action.payload.count,
                    nextDataFriend : action.payload.next,
                    prevDataFriend : action.payload.previous,
                    dataFriend : resultFull
                }
            }
        }
        case CLEAR_LIST_FOLLOW: {
            if (action.payload.isMe) {
                return {
                    ...state,
                    data: []
                }
            } else {
                return {
                    ...state,
                    dataFriend: []
                }
            }
        }
        case UPDATE_LIST_FOLLOW_STATUS: 
        case UPDATE_BUTTON_FOLLOW_LIST_SEARCH_BASIC:{
            /* 
                Payload {status, user_id}
                -------------
                status: status of follow or following
                user_id: id of user
            */
            const dataProfileOfMe = state.data.slice(0);
            const dataProfileOfFriend = state.dataFriend.slice(0);

            const user_id = action.payload.user_id;
            const status = action.payload.status;
            // Found user exist in list profile follow
            const foundUser = dataProfileOfMe.find((value) => value.user_id == user_id);
            const foundUserFriend = dataProfileOfFriend.find((value) => value.user_id == user_id);
            if (action.payload.hasOwnProperty('blocked')) {
                const blocked = action.payload.blocked;
                if (foundUser) {
                    foundUser.blocked = blocked;
                    foundUser.follow_status = null;
                }
                if (foundUserFriend){
                    foundUserFriend.blocked = blocked;
                    foundUserFriend.follow_status = null;
                }
            }
            else {
                foundUser && (foundUser.follow_status = status)
                foundUserFriend && (foundUserFriend.follow_status = status);
            }
            // Found user exist in list friend profile-entities follow
            return {
                ...state,
                data: dataProfileOfMe,
                dataFriend: dataProfileOfFriend
            };
        }
        default : {
            return state;
        }
    }
    
}

export default listFollowReducer;