import { RECEIVE_NAV_HEADER } from '../actions/nav_header_actions';

export const navHeaderReducer = (oldState = null, action) => {
    Object.freeze(oldState);
    // debugger
    switch (action.type) {
        case RECEIVE_NAV_HEADER:
            return action.header
        default:
            return oldState;
    }
};

export default navHeaderReducer;