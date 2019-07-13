import { connect } from 'react-redux';
import Notify from '@screens/Notify';
import { getListNotify, getListNotifyLoadMore, requestFollowNotify} from '@actions/notify';
import { detailEntity } from '@actions/entities';
import { requestEntityDetail } from '@actions/entity';
import { requestFollowing } from '@actions/follower';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getListNotify: (params) => dispatch(getListNotify(params)),
    getListNotifyLoadMore: (params) => dispatch(getListNotifyLoadMore(params)),
    detailEntity: (params) => dispatch(detailEntity(params)),
    requestEntityDetail: (params) => dispatch(requestEntityDetail(params)),
    requestFollowing: (payload) => dispatch(requestFollowing(payload)),
    requestFollowNotify: (payload) => dispatch(requestFollowNotify(payload))
  };
};

const mapStateToProps = ({ notifyReducer, entityReducer ,userReducer}) => {
  return ({
    notifyReducer,
    entityReducer,
    userReducer
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
