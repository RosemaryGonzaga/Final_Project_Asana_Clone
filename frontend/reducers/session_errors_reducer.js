import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions'

const sessionErrorsReducer = (oldState = "", action) => {   // should state shape be an array? right now I'm only serving up a single error at a time in my json response
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return ""
        case RECEIVE_ERRORS:
            return action.errors
        default:
            return oldState;
    }
};

export default sessionErrorsReducer;
