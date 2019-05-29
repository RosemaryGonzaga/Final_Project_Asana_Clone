import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/session_actions';

const sessionReducer = (oldState = { id: null }, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            const { currentUser } = action;
            return { id: currentUser.id }
        case REMOVE_CURRENT_USER:
            return { id: null }
        // case RECEIVE_ERRORS: // sessionReducer should ignore errors, leave them for the errorsReducer to handle??
        //     return oldState; 
        default:
            return oldState;
    }
};

export default sessionReducer;