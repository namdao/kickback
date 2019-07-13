import {connect} from 'react-redux';
import LoginScreen from '@screens/LoginScreen';
import {login} from '@actions/login';
import {signup} from '@actions/signup';
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    login: (params) => dispatch(login(params)),
    signup: (params) => dispatch(signup(params))
  };
};

const mapStateToProps = ({user}) => {
  return ({
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
