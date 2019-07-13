import {connect} from 'react-redux';
import EditCommentScreen from '@screens/Comment';
import {requestEditComment} from '@actions/comments';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    requestEditComment:(payload) => dispatch(requestEditComment(payload)),
  };
};

const mapStateToProps = ({}) => {
  return ({
    
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentScreen);
