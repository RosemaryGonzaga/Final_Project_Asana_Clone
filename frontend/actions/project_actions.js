import * as ProjectApiUtil from '../util/projects_api_util';

// action types
export const RECEIVE_ALL_PROJECTS = "RECEIVE_ALL_PROJECTS";
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";


// regular action creators
const receiveAllProjects = projects => {    // to think about: should projects come in as an array or object? prob obj since my state shape is an obj?
    return {
        type: RECEIVE_ALL_PROJECTS,
        projects,
    };
};

const receiveProject = project => {
    // debugger
    return {
        type: RECEIVE_PROJECT,
        project,
    };
};

const removeProject = projectId => {    // double check later
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
    // debugger
    return dispatch => {
        // debugger
        return ProjectApiUtil.createProject(project)
            .then(payload => dispatch(receiveProject(payload)));
    };
}

export const updateProject = project => {
    return dispatch => {
        return ProjectApiUtil.updateProject(project)
            .then(payload => dispatch(receiveProject(payload)));
    };
}

export const deleteProject = id => {
    return dispatch => {
        return ProjectApiUtil.deleteProject(id)
            .then(payload => dispatch(removeProject(id)));  // double check later
    };
}