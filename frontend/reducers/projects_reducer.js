import { RECEIVE_ALL_PROJECTS, RECEIVE_PROJECT, REMOVE_PROJECT } from '../actions/project_actions';
import { merge } from 'lodash';

const projectsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ALL_PROJECTS:
            return merge({}, action.projects);
        case RECEIVE_PROJECT:
            const { project } = action;
            return merge({}, oldState, [project.id]: project);
        case REMOVE_PROJECT:
            const { projectId } = action;
            let newState = merge({}, oldState);
            delete newState[projectId]
            return newState;
        default:
            return oldState;
    }
};

export default projectsReducer;