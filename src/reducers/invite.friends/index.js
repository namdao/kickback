import { INVITE_FRIEND_REQUEST, INVITE_FRIEND_FAILED, INVITE_FRIEND_SUCCESS, INVITE_FRIEND_RESET_STATE } from '@constants/action-names';

const initialState = {
    inviteFriendResult: {},
    verifyGUI: false
};

const inviteFriendsReducer = (state = initialState, action) => {
    switch (action.type) {

        case INVITE_FRIEND_REQUEST:
            return{
                ...initialState
            };
        case INVITE_FRIEND_FAILED:

            return{
                ...state,
            };

        case INVITE_FRIEND_SUCCESS:

            return{
                ...state,
                inviteFriendResult: action.payload,
                verifyGUI: true
            };

        case INVITE_FRIEND_RESET_STATE:

            return {
                ...initialState
            };


        default: {
            return state;
        }
    }
};

export default inviteFriendsReducer;

//State Selector

export const selectInviteFriendsResult = (state) => state.inviteFriendsReducer.verifyGUI;
