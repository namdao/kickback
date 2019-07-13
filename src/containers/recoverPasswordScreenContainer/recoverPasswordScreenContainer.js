import {connect} from 'react-redux';
import RecoverPasswordScreen from '@screens/RecoverPasswordScreen';
import { recoveryPassword } from '@actions/recoveryPassword';
const mapDispatchToProps = (dispatch) => {
  return {
      dispatch,
      recoveryPassword:(payload) => dispatch(recoveryPassword(payload)),

  };
};

const mapStateToProps = ({user}) => {
  return ({
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordScreen);
