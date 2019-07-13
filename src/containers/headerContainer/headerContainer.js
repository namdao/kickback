import { connect } from 'react-redux';
import HeaderFeed from '@components/feedEntity/headerFeed';
import { requestFollowing } from '@actions/follower';
import { createReport } from '@actions/report';
import {requestBlockedUsers} from '@actions/entities';
import { requestDeletePost } from '@actions/entities';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    requestFollowing: (payload) => dispatch(requestFollowing(payload)),
    requestDeletePost: (payload) => dispatch(requestDeletePost(payload)),
    createReport: (payload) => dispatch(createReport(payload)),
    requestBlockedUsers:(payload) => dispatch(requestBlockedUsers(payload)),
  };
};

const mapStateToProps = ({ uploadingReducer, screensReducer, userReducer, entitiesReducer, followerReducer, videoListReducer, reportReducer, loadingReducer }) => {
  return ({
    userReducer,
    followerReducer,
    reportReducer,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFeed);
