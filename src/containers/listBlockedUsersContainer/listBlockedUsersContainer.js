import {connect} from 'react-redux';
import ListBlockedUsers from '@screens/ListBlockedUsers';
import {requestListBlockedUsers,fetchListBlockedUsersMore} from '@actions/listBlockedUsers';
import {requestBlockedUsers} from '@actions/entities';
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        requestBlockedUsers:(payload) => dispatch(requestBlockedUsers(payload)),
        requestListBlockedUsers:(payload) => dispatch(requestListBlockedUsers(payload)),
        fetchListBlockedUsersMore:(payload) => dispatch(fetchListBlockedUsersMore(payload))
    }
}

const mapStateToProps = ({userReducer,listBlockedUsersReducer}) => {
    return ({
        userReducer,
        listBlockedUsersReducer
    })
};

export default connect(mapStateToProps,mapDispatchToProps)(ListBlockedUsers);
