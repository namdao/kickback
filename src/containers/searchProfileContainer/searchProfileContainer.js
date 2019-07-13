import { connect } from 'react-redux'

import SearchProfile from '@screens/SearchProfile'
import { requestFollowing } from '@actions/follower';
import { BACK_HOME } from '@constants/action-names';
import { requestListSearchUsersBasic,fetchListSearchUsersBasicMore} from '@actions/search.profile';
import { clearListSearchUsers } from '@actions/search.profile';
import {requestBlockedUsers} from '@actions/entities';
const mapDispatchToProps = (dispatch) => {
    return {
        requestFollowing: (payload) => dispatch(requestFollowing(payload)),
        backHome: () => dispatch({ type: BACK_HOME }),
        requestListSearchUsersBasic: (payload) => dispatch(requestListSearchUsersBasic(payload)),
        fetchListSearchUsersBasicMore: (payload) => dispatch(fetchListSearchUsersBasicMore(payload)),
        clearListSearchUsers: (payload) => dispatch(clearListSearchUsers(payload)),
        requestBlockedUsers:(payload) => dispatch(requestBlockedUsers(payload)),
    };
};

const mapStateToProps = ({ userReducer, loadingReducer, searchProfileReducer }) => {
    return ({
        userReducer,
        loadingReducer,
        searchProfileReducer,
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProfile);
