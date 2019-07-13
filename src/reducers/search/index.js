import {
    FETCH_LIST_SEARCH_USERS_BASIC,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE,
    FETCH_LIST_SEARCH_USERS_BASIC_SUCCESS,
    FETCH_LIST_SEARCH_USERS_BASIC_FAILED,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_SUCCESS,
    FETCH_LIST_SEARCH_USERS_BASIC_MORE_FAILED,
    CLEAR_LIST_SEARCH_USERS,
    UPDATE_BUTTON_FOLLOW_LIST_SEARCH_BASIC,
    UPDATE_BUTTON_FOLLOW_IN_LIST_SEARCH,FOLLOWING_SUCCESS,
    UPDATE_LIST_FOLLOW_STATUS,

    FETCH_LIST_SEARCH_USERS_ADVANCED_SUCCESS,
    FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_SUCCESS,
  } from '@constants/action-names';


  const initialState = {
    data: [],
    filterText: '',  
  }; 

  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_LIST_SEARCH_USERS: {
            return {
                data : []
            }
        }
        case FETCH_LIST_SEARCH_USERS_BASIC_SUCCESS : {
            return {
                ...state,
                data: action.payload.results,
                count: action.payload.count,
                prev: action.payload.previous,
                next: action.payload.next,
            }
        }
        case FETCH_LIST_SEARCH_USERS_BASIC_MORE_SUCCESS : {
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
        case FETCH_LIST_SEARCH_USERS_ADVANCED_SUCCESS : {
            return {
                ...state,
                data: action.payload.results,
                count: action.payload.count,
                prev: action.payload.previous,
                next: action.payload.next,
            }
        }
        case FETCH_LIST_SEARCH_USERS_ADVANCED_MORE_SUCCESS : {
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
        case UPDATE_LIST_FOLLOW_STATUS:
        case UPDATE_BUTTON_FOLLOW_LIST_SEARCH_BASIC: {
            const dataProfileOfMe = state.data.slice(0);
            const user_id = action.payload.user_id;
            const status = action.payload.status;
            const foundUser = dataProfileOfMe.find((value) => value.user_id == user_id);
            // Found user exists in list search basic
            if (action.payload.hasOwnProperty('blocked')) {
                const blocked = action.payload.blocked;
                if (foundUser) {
                    foundUser.blocked = blocked;
                    foundUser.follow_status = null;
                }
            } else {
                // Found user exist in list profile follow
                foundUser && (foundUser.follow_status = status)
            }
            
            
            return {
                ...state,
                data: dataProfileOfMe,
            };
        }
        
        default: {
          return state;
        }
      }  
    }
 export default searchReducer;