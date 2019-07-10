import * as UserApiUtil from '../util/users_api_util';

// action types
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
// export const CLEAR_ALL_USERS = "CLEAR_ALL_USERS";


// regular action creators
const receiveAllUsers = users => {
    return {
        type: RECEIVE_ALL_USERS,
        users,
    };
};

// export const clearAllUsers = () => {
//     return { type: CLEAR_ALL_USERS };
// }


// thunk action creators
export const fetchUsers = teamId => {   // refactored to take in teamId (only need to fetch users associated with a specific team...for now)
    return dispatch => {
        return UserApiUtil.fetchUsers(teamId)
            .then(payload => dispatch(receiveAllUsers(payload)));
    };
}