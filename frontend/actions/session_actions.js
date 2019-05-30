import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS"; // ADDED THIS!

// regular action creators

const receiveCurrentUser = currentUser => {
    return {
        type: RECEIVE_CURRENT_USER,
        currentUser,
    };
};

const logoutCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER,
    };
};

const receiveErrors = errors => {   // naming implies the arg is an array, but right now I'm only passing up a single string
    return {
        type: RECEIVE_ERRORS,
        errors,              
    };
};

export const clearErrors = () => {     // added this
    // debugger
    return {
        type: CLEAR_ERRORS,
    }
}


// thunk action creators --> not sure if I implemented errors correctly?

export const signup = user => {
    return dispatch => {
        return SessionApiUtil.signup(user)
            .then(
                successPayload => dispatch(receiveCurrentUser(successPayload)),
                rejectPromise => dispatch(receiveErrors(rejectPromise.responseJSON.errors))
            )
    };
};

export const login = user => {
    return dispatch => {
        return SessionApiUtil.login(user)
            .then(
                successPayload => dispatch(receiveCurrentUser(successPayload)),
                rejectPromise => {
                    // debugger
                    return dispatch(receiveErrors(rejectPromise.responseJSON.errors))
                }
            )
    };
};

export const logout = () => {
    // debugger
    return dispatch => {
        // debugger
        return SessionApiUtil.logout()
            .then(() => dispatch(logoutCurrentUser()))
    };
};
