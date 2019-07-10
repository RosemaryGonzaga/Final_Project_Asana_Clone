import * as UserApiUtil from '../util/users_api_util';

// action types
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";


// regular action creators
const receiveAllUsers = users => {
    return {
        type: RECEIVE_ALL_USERS,
        users,
    };
};

const receiveUser = user => {
    // debugger
    return {
        type: RECEIVE_USER,
        user,
    }
}


// thunk action creators
export const fetchUsers = teamId => {   // refactored to take in teamId (only need to fetch users associated with a specific team...for now)
    return dispatch => {
        return UserApiUtil.fetchUsers(teamId)
            .then(users => dispatch(receiveAllUsers(users)));
    };
}

export const fetchUserByEmail = email => {
    // debugger
    return dispatch => {
        // debugger
        return UserApiUtil.fetchUserByEmail(email)
            .then(user => dispatch(receiveUser(user)));
    };
}