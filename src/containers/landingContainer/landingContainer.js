import {home} from '@actions/changeRoot';
import {connect} from 'react-redux';
import LandingScreen from '@screens/Landing';
import {fetchEntities} from '@actions/entities';
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    goToHome: () => dispatch(home()),
    fetchEntities:() => dispatch(fetchEntities()),
  };
};

const mapStateToProps = ({user}) => {
  return ({
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
