import * as UserApiUtil from '../util/users_api_util';

// action types
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";


// regular action creators
const receiveAllUsers = users => {
    return {
        type: RECEIVE_ALL_USERS,
        users,
    };
};

// thunk action creators
export const fetchUsers = () => {
    return dispatch => {
        return UserApiUtil.fetchUsers()
            .then(payload => dispatch(receiveAllUsers(payload)));
    };
}