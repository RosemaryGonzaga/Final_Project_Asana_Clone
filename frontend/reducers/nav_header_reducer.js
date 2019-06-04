import { RECEIVE_NAV_HEADER, RESET_NAV_HEADER } from '../actions/nav_header_actions';

export const navHeaderReducer = (oldState = "Home", action) => { // To consider: should "Home be the default state?" Or null? Or something else?
    Object.freeze(oldState);
    // debugger
    switch (action.type) {
        case RECEIVE_NAV_HEADER:
            return action.header;
        case RESET_NAV_HEADER:
            return action.header;
        default:
            return oldState;
    }
};

export default navHeaderReducer;