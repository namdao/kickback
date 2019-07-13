import {connect} from 'react-redux';
import PrivacyMode from '@screens/PrivacyMode';
import { requestChangePrivacyMode } from '@actions/privacyMode';
const mapDispatchToProps = (dispatch) => {
  return {
      dispatch,
      requestChangePrivacyMode: (payload) => dispatch(requestChangePrivacyMode(payload)),

  };
};

const mapStateToProps = ({userReducer,privacyModeReducer}) => {
  return ({
    userReducer,
    privacyModeReducer
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyMode);
