import { connect } from 'react-redux';
import InfoProfile from '@components/profile/infoProfile';
import { requestFollowing } from '@actions/follower';
import {requestBlockedUsers, fetchEntitiesMore} from '@actions/entities';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    fetchEntitiesMore: (payload) => dispatch(fetchEntitiesMore(payload)),
    requestFollowing: (payload) => dispatch(requestFollowing(payload)),
    requestBlockedUsers:(payload) => dispatch(requestBlockedUsers(payload))
  };
};

const mapStateToProps = ({ userReducer, followerReducer, entitiesReducer,loadingReducer }) => {
  return ({
    userReducer,
    followerReducer,
    entitiesReducer,
    loadingReducer
  });
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(InfoProfile);
