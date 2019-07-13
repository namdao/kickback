import { connect } from 'react-redux';
import Profile from '@screens/Profile';
import { getInfoProfile } from '@actions/profile';
import { fetchEntities, fetchEntitiesMore } from '@actions/entities';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getInfoProfile: () => dispatch(getInfoProfile()),
    fetchEntities: (payload) => dispatch(fetchEntities(payload)),
  };
};

const mapStateToProps = ({ userReducer, followerReducer, mediasReducer, videoListReducer, entitiesReducer, reportReducer,loadingReducer }) => {
  return ({
    userReducer,
    entitiesReducer,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
