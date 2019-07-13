import { connect } from 'react-redux';
import InviteFriends from '@screens/InviteFriends';
import { inviteFriend, resetState } from '@actions/invite.friends';
import {selectInviteFriendsResult} from "../../reducers/invite.friends";

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        inviteFriend: (payload) => dispatch(inviteFriend(payload)),
        resetState: () => dispatch(resetState())
    };
};

const mapStateToProps = storeState => ({
    verifyGUI: selectInviteFriendsResult(storeState)
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriends);
