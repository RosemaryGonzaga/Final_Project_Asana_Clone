import * as SectionApiUtil from '../util/sections_api_util';
import { closeModal } from './modal_actions';

// action types
export const RECEIVE_ALL_SECTIONS = "RECEIVE_ALL_SECTIONS";
export const RECEIVE_SECTION = "RECEIVE_SECTION";
export const REMOVE_SECTION = "REMOVE_SECTION";


// regular action creators
const receiveAllSections = sections => {
    return {
        type: RECEIVE_ALL_SECTIONS,
        sections,
    };
};

const receiveSection = section => {
    return {
        type: RECEIVE_SECTION,
        section,
    };
};

const removeSection = sectionId => {
    return {
        type: REMOVE_SECTION,
        sectionId,  // whenever I dispatch removeSection, do I also need to dispatch removeTask?
    };
};


// thunk action creators

export const fetchSections = projectId => {     // different from the usual pattern
    return dispatch => {
        return SectionApiUtil.fetchSections(projectId)
            .then(payload => dispatch(receiveAllSections(payload)));
    };
}

export const fetchSection = id => {
    return dispatch => {
        return SectionApiUtil.fetchSection(id)
            .then(payload => dispatch(receiveSection(payload)));
    };
}

export const createSection = section => {
    debugger
    return dispatch => {
        debugger
        return SectionApiUtil.createSection(section)
            .then(payload => dispatch(receiveSection(payload)));
    };
}

export const updateSection = section => {
    return dispatch => {
        return SectionApiUtil.updateSection(section)
            .then(payload => {
                dispatch(receiveSection(payload))
                // dispatch(closeModal())
            });
    };
}

export const deleteSection = id => {
    return dispatch => {
        return SectionApiUtil.deleteSection(id)
            .then(payload => {
                dispatch(removeSection(id))     // whenever I dispatch removeSection, do I also need to dispatch removeTask? what about removing sections whenever I dispatch removeProject?
                // dispatch(closeModal())
            });
    };
}