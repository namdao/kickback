import {connect} from 'react-redux';
import ListFollowScreen from '@screens/ListFollowScreen';
import {requestListFollower,requestListFollowing,clearListFollow} from '@actions/listFollow';
import {requestFollowing} from '@actions/follower';
import { fetchListFollowerMore, fetchListFollowingMore } from '@actions/listFollow';
import {requestBlockedUsers} from '@actions/entities';

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        requestFollowing:(payload) => dispatch(requestFollowing(payload)),
        requestListFollower:(payload) => dispatch(requestListFollower(payload)),
        requestListFollowing:(payload) => dispatch(requestListFollowing(payload)),
        clearListFollow:(payload) => dispatch(clearListFollow(payload)),
        fetchListFollowerMore:(payload) => dispatch(fetchListFollowerMore(payload)),
        fetchListFollowingMore:(payload) => dispatch(fetchListFollowingMore(payload)),
        requestBlockedUsers:(payload) => dispatch(requestBlockedUsers(payload))
    }
};

const mapStateToProps = ({userReducer,listFollowReducer,followerReducer}) => {
    return ({
        userReducer,
        listFollowReducer,
        followerReducer
    })
};
export default connect(mapStateToProps,mapDispatchToProps)(ListFollowScreen);

