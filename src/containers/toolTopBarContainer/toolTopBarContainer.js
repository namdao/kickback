import {connect} from 'react-redux';
import ToolTopBar from '@components/modals/toolTopBar';
import { sortDashBoard } from '@actions/entities';


const mapStateToProps = ({entitiesReducer}) => (
  {
    entitiesReducer
  }
);

const mapDispatchToProps = (dispatch,getState) => (
  {
    sortDashBoard: (payload) => dispatch(sortDashBoard(payload)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ToolTopBar);
