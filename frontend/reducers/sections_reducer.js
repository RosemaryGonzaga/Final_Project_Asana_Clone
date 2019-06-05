import { RECEIVE_ALL_SECTIONS, RECEIVE_SECTION, REMOVE_SECTION } from '../actions/section_actions';
import { merge } from 'lodash';

const sectionsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ALL_SECTIONS:
            return merge({}, action.sections);
        case RECEIVE_SECTION:
            const { section } = action;
            return merge({}, oldState, { [section.id]: section });
        case REMOVE_SECTION:
            const { sectionId } = action;
            let newState = merge({}, oldState);
            delete newState[sectionId]
            return newState;
        default:
            return oldState;
    }
};

export default sectionsReducer;