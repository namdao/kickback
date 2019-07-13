import {connect} from 'react-redux';

import SignUpActiveScreen from '@screens/SignUp/signup-active';
import { signupActiveSuccess } from '@actions/signup';


const mapStateToProps = ({userReducer}) => (
  {
    userReducer
  }
);

const mapDispatchToProps = (dispatch,getState) => (
  {
    signupActiveSuccess: (payload) => dispatch(signupActiveSuccess(payload)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpActiveScreen);
