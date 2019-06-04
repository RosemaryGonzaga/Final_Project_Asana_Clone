import * as ProjectApiUtil from '../util/projects_api_util';
import { closeModal } from './modal_actions';

// action types
export const RECEIVE_ALL_PROJECTS = "RECEIVE_ALL_PROJECTS";
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";


// regular action creators
const receiveAllProjects = projects => {
    return {
        type: RECEIVE_ALL_PROJECTS,
        projects,
    };
};

const receiveProject = project => {
    return {
        type: RECEIVE_PROJECT,
        project,
    };
};

const removeProject = projectId => {
    return {
        type: REMOVE_PROJECT,
        projectId,
    };
};


// thunk action creators

export const fetchProjects = () => {
    return dispatch => {
        return ProjectApiUtil.fetchProjects()
            .then(payload => dispatch(receiveAllProjects(payload)));
    };
}

export const fetchProject = id => {
    return dispatch => {
        return ProjectApiUtil.fetchProject(id)
            .then(payload => dispatch(receiveProject(payload)));
    };
}

export const createProject = project => {
    return dispatch => {
        return ProjectApiUtil.createProject(project)
            .then(payload => dispatch(receiveProject(payload)));
    };
}

export const updateProject = project => {
    return dispatch => {
        return ProjectApiUtil.updateProject(project)
            .then(payload => {
                dispatch(receiveProject(payload)),
                dispatch(closeModal())
            });
    };
}

export const deleteProject = id => {
    return dispatch => {
        return ProjectApiUtil.deleteProject(id)
            .then(payload => {
                dispatch(removeProject(id)),
                dispatch(closeModal())
            });
    };
}