import { connect } from 'react-redux'
import Search from '@screens/Search'
import { requestFollowing } from '@actions/follower';
import { BACK_HOME } from '@constants/action-names';
import { requestListSearchUsersBasic,fetchListSearchUsersBasicMore} from '@actions/search';
import { clearListSearchUsers } from '@actions/search';
import {requestBlockedUsers} from '@actions/entities';

const mapDispatchToProps = (dispatch) => {
  return {
    requestFollowing: (payload) => dispatch(requestFollowing(payload)),
    backHome: () => dispatch({ type: BACK_HOME }),
    requestBlockedUsers:(payload) => dispatch(requestBlockedUsers(payload)),
    requestListSearchUsersBasic: (payload) => dispatch(requestListSearchUsersBasic(payload)),
    fetchListSearchUsersBasicMore: (payload) => dispatch(fetchListSearchUsersBasicMore(payload)),
    clearListSearchUsers: (payload) => dispatch(clearListSearchUsers(payload)),
  };
};

const mapStateToProps = ({ userReducer, loadingReducer,searchReducer }) => {
  return ({
    userReducer,
    loadingReducer,
    searchReducer,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
 