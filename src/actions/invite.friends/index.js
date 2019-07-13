import { INVITE_FRIEND_REQUEST, INVITE_FRIEND_RESET_STATE } from "@constants/action-names";

const inviteFriend = (payload) => {

    return {
        type: INVITE_FRIEND_REQUEST,
        payload: payload
    }
};

const resetState = () => {
    return {
        type: INVITE_FRIEND_RESET_STATE
    }
};

export {
    inviteFriend,
    resetState
};