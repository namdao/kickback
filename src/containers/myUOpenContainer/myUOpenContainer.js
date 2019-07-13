import {connect} from 'react-redux';

import MyUOpen from '@screens/MyUOpen';
import { toggleMyU } from '@actions/toggleMyU';
import { fetchEntities } from '@actions/entities';


const mapStateToProps = ({userReducer, myUReducer, loadingReducer}) => (
  {
    userReducer,
    myUReducer,
    loadingReducer
  }
);

const mapDispatchToProps = (dispatch,getState) => (
  {
    toggleMyU: (payload) => dispatch(toggleMyU(payload)),
    fetchEntities: (payload) => dispatch(fetchEntities(payload))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MyUOpen);
