import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/session_actions'

const sessionErrorsReducer = (oldState = "", action) => {   // should state shape be an array? right now I'm only serving up a single error at a time in my json response
    Object.freeze(oldState);
    // debugger
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return ""
        case RECEIVE_ERRORS:
            return action.errors
        case CLEAR_ERRORS:  // added this!
            // debugger
            return ""
        default:
            return oldState;
    }
};

export default sessionErrorsReducer;
