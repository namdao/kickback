import { connect } from 'react-redux';
import Home1 from '@screens/Home1';
import { checkPermission } from '@actions/permissions';
import {checkVersion} from '@actions/login';
import { fetchEntities, fetchEntitiesMore } from '@actions/entities';
import { getInfoProfile } from '@actions/profile';
import { BACK_HOME } from '@constants/action-names';
import {registrationNotification} from "@actions/user";
import { detailEntity } from '@actions/entities';
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    checkPermission: (params) => dispatch(checkPermission(params)),
    fetchEntities: () => dispatch(fetchEntities()),
    fetchEntitiesPullRefresh: () => dispatch(fetchEntities({isPullRefresh: true})),
    fetchEntitiesMore: (payload) => dispatch(fetchEntitiesMore(payload)),
    getInfoProfile: () => dispatch(getInfoProfile()),
    backHome: () => dispatch({ type: BACK_HOME }),
    checkVersion:(payload) => dispatch(checkVersion(payload)),
    registrationNotification: (payload) => dispatch(registrationNotification(payload)),
    detailEntity:(payload) => dispatch(detailEntity(payload))
  };
};

const mapStateToProps = ({ uploadingReducer, screensReducer, entitiesReducer, loadingReducer,userReducer }) => {
  return ({
    uploadingReducer,
    screensReducer,
    entitiesReducer,
    loadingReducer,
    userReducer
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Home1);
