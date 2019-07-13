import {connect} from 'react-redux';
import SearchAdvanceProfile from '@screens/SearchAdvanceProfile';
import { requestListSearchUsersBasic,fetchListSearchUsersBasicMore,requestListSearchUsersAdvanced,
    fetchListSearchUsersAdvancedMore} from '@actions/search.profile';
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        requestListSearchUsersAdvanced: (payload) => dispatch(requestListSearchUsersAdvanced(payload)),
        // fetchListSearchUsersAdvancedMore: (payload) => dispatch(fetchListSearchUsersAdvancedMore(payload))
    };
};

const mapStateToProps = ({userReducer,searchProfileReducer}) => {
    return ({
        // userReducer,
        // searchProfileReducer
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAdvanceProfile);