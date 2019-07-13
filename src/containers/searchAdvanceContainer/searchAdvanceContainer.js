import {connect} from 'react-redux';
import SearchAdvance from '@screens/SearchAdvance';
import { requestListSearchUsersBasic,fetchListSearchUsersBasicMore,requestListSearchUsersAdvanced,
  fetchListSearchUsersAdvancedMore} from '@actions/search';
const mapDispatchToProps = (dispatch) => {
  return {
      dispatch,
      requestListSearchUsersAdvanced: (payload) => dispatch(requestListSearchUsersAdvanced(payload)),
      // fetchListSearchUsersAdvancedMore: (payload) => dispatch(fetchListSearchUsersAdvancedMore(payload))
  };
};

const mapStateToProps = ({userReducer,searchReducer}) => {
  return ({
    // userReducer,
    // searchReducer
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAdvance);