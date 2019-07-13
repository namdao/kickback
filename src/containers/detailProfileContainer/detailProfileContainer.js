import {connect} from 'react-redux';
import DetailProfile from '@components/profile/detailProfile';
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = ({userReducer}) => {
  return ({
    userReducer,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProfile);
