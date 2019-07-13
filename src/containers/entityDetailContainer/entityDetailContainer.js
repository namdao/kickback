import { connect } from 'react-redux';
import EntityDetail from '@screens/EntityDetail';
import { requestEntityDetail } from '@actions/entity';
import { requestLikeEntity, fetchCommentMore, clearEntity, fetchSubCommentMore } from '@actions/entity';
import { requestFollowing } from '@actions/follower';
import { requestAddComment, requestEditComment, requestDeleteComment, requestReplyComment, updateFollowerLocal } from '@actions/comments';
import { updateFollowingComment } from '@actions/comments';
import { requestDeletePost } from '@actions/entities';
import { createReport, createReportComment } from '@actions/report';
import {requestBlockedUsers} from '@actions/entities';
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    requestEntityDetail: (payload) => dispatch(requestEntityDetail(payload)),
    requestAddComment: (payload) => dispatch(requestAddComment(payload)),
    requestEditComment: (payload) => dispatch(requestEditComment(payload)),
    requestDeleteComment: (payload) => dispatch(requestDeleteComment(payload)),
    requestReplyComment: (payload) => dispatch(requestReplyComment(payload)),
    requestFollowing: (payload) => dispatch(requestFollowing(payload)),
    updateFollowerLocal: (payload) => dispatch(updateFollowerLocal(payload)),
    updateFollowingComment: (payload) => dispatch(updateFollowingComment(payload)),
    requestLikeEntity: (payload) => dispatch(requestLikeEntity(payload)),
    fetchCommentMore: (payload) => dispatch(fetchCommentMore(payload)),
    fetchSubCommentMore: (payload) => dispatch(fetchSubCommentMore(payload)),
    clearEntity: () => dispatch(clearEntity()),
    requestDeletePost: (payload) => dispatch(requestDeletePost(payload)),
    createReport: (payload) => dispatch(createReport(payload)),
    createReportComment: (payload) => dispatch(createReportComment(payload)),
    requestBlockedUsers:(payload) => dispatch(requestBlockedUsers(payload))
  };
};

const mapStateToProps = ({ userReducer, entitiesReducer, commentReducer, followerReducer, loadingReducer, entityReducer, videoListReducer, reportReducer }) => {
  return ({
    userReducer,
    loadingReducer,
    entitiesReducer,
    commentReducer,
    followerReducer,
    entityReducer,
    videoListReducer,
    reportReducer
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityDetail);
