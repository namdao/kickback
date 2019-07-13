import { connect } from 'react-redux';
import FullScreen from '@components/modals/fullScreenVideo'

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = ({ uploadingReducer, screensReducer, userReducer, entitiesReducer, followerReducer, videoListReducer, reportReducer, loadingReducer }) => {
  return ({
    userReducer,
    followerReducer,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(FullScreen);
