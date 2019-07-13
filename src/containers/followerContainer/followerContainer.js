import { connect } from 'react-redux';
import Follower from '@screens/Follower';
import { fetchFollower } from '@actions/follower';
import { fetchEntities } from '@actions/entities';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    fetchFollower: (uid) => dispatch(fetchFollower(uid)),
    fetchEntities: (payload) => dispatch(fetchEntities(payload)),
  };
};

const mapStateToProps = ({ userReducer }) => {
  return ({
    userReducer
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Follower);
