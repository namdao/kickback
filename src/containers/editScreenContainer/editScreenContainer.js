import {connect} from 'react-redux';
import EditScreen from '@screens/EditScreen';
import { changeStateLoading } from "@actions/loading";
import { createPost } from '@actions/createPost';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    changeStateLoading: (payload) => dispatch(changeStateLoading(payload)),
    createPost: (payload) => dispatch(createPost(payload)),
  };
};

const mapStateToProps = ({userReducer,loadingReducer}) => {
  return ({
    userReducer,
    loadingReducer
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);
