import { FETCH_LIST_BLOCKED_USERS,
    FETCH_LIST_BLOCKED_USERS_SUCCESS,
    FETCH_LIST_BLOCKED_USERS_MORE,
    FETCH_LIST_BLOCKED_USERS_MORE_SUCCESS,
    UPDATE_UNBLOCK_LOCAL
} from '@constants/action-names';

const initialState = {
    data : []
}

const listBlockedUsersReducer = (state = initialState , action) => {
    switch(action.type){
        case FETCH_LIST_BLOCKED_USERS_SUCCESS : {
            return {
                ...state,
                    data: action.payload.results,
                    count: action.payload.count,
                    prev: action.payload.previous,
                    next: action.payload.next,
            }
        }
        case FETCH_LIST_BLOCKED_USERS_MORE_SUCCESS : {
            const {results} = action.payload;
            let resultFull = [...state.data, ...results];
            return {
                ...state,
                count : action.payload.count,
                next : action.payload.next,
                prev : action.payload.previous,
                data : resultFull
            }
        }
        case UPDATE_UNBLOCK_LOCAL: {
            const tmpState = JSON.parse(JSON.stringify(state));
            const {user_id} = action.payload;
            const remove = (array,user_id) => {
                const idx = array.findIndex(x => x.user_id == user_id);
                return array.filter((el, index) => index !== idx);
            }
            let dataResult = remove(tmpState.data, user_id);
            tmpState.data = dataResult;
            return {
                ...tmpState
            }

        }
        default : {
            return state;
        }
    }
}

export default listBlockedUsersReducer;