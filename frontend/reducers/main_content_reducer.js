import { RECEIVE_MAIN_CONTENT } from '../actions/main_content_actions';

export const mainContentReducer = (oldState = "projectIndex", action) => {
    Object.freeze(oldState);
    // debugger
    switch (action.type) {
        case RECEIVE_MAIN_CONTENT:
            return action.content;
        default:
            return oldState;
    }
};

export default mainContentReducer;