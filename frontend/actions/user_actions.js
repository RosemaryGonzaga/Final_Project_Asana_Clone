import * as UserApiUtil from '../util/users_api_util';

// action types
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const REMOVE_ALL_USERS = "REMOVE_ALL_USERS";


// regular action creators
export const receiveAllUsers = users => {
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

export const removeUser = userId => {
    return {
        type: REMOVE_USER,
        userId
    }
}

export const removeAllUsers = () => {
    return {
        type: REMOVE_ALL_USERS,
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

// This uses the same backend route as fetchUserByEmail,
// but it is used to check a logged in user's password.
// It will hit the #show action of the UsersController.
export const checkPassword = user => {
    return dispatch => {
        return UserApiUtil.checkPassword(user)
            // .then(user => dispatch(receiveUser(user)));
    };
}

export const updateUser = user => {
    return dispatch => {
        return UserApiUtil.updateUser(user)
            .then(updatedUser => dispatch(receiveUser(updatedUser)));
    };
}

export const deleteUser = id => {
    return dispatch => {
        return UserApiUtil.deleteUser(id)
            .then(payload => {
                dispatch(removeUser(id))
            }
        );
    };
}