import { connect } from 'react-redux';
import ListIcon from '../../components/feedEntity/listIcon';
import { requestFollowing } from '@actions/follower';
import { createReport } from '@actions/report';
import { detailEntity, requestLikeEntity} from '@actions/entities';
import {requestBlockedUsers} from '@actions/entities';
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    detailEntity: (payload) => dispatch(detailEntity(payload)),
    requestLikeEntity: (payload) => dispatch(requestLikeEntity(payload)),
    requestFollowing: (payload) => dispatch(requestFollowing(payload)),
    requestDeletePost: (payload) => dispatch(requestDeletePost(payload)),
    createReport: (payload) => dispatch(createReport(payload)),
    requestBlockedUsers:(payload) => dispatch(requestBlockedUsers(payload)),
  };
};

const mapStateToProps = ({ userReducer, followerReducer,reportReducer }) => {
  return ({
    userReducer,
    followerReducer,
    reportReducer,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ListIcon);
