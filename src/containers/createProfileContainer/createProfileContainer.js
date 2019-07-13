import {connect} from 'react-redux';

import { signupActiveSuccess } from '@actions/signup';
import CreateProfile from '../../screens/CreateProfile';
import { updateProfile, editProfile } from '@actions/profile';
import { changeStateLoading } from "@actions/loading";


const mapStateToProps = ({userReducer, loadingReducer}) => (
  {
    userReducer,
    loadingReducer
  }
);

const mapDispatchToProps = (dispatch,getState) => (
  {
    signupActiveSuccess: (payload) => dispatch(signupActiveSuccess(payload)),
    updateProfile: (payload) => dispatch(updateProfile(payload)),
    editProfile: (payload) => dispatch(editProfile(payload)),
    changeStateLoading: (payload) => dispatch(changeStateLoading(payload))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
