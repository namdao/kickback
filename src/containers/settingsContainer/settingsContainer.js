import {connect} from 'react-redux';
import Settings from '@screens/Settings';
import logout from '@actions/logout';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    logout: () => dispatch(logout())
  };
};

const mapStateToProps = ({userReducer}) => {
  return ({
    userReducer
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
