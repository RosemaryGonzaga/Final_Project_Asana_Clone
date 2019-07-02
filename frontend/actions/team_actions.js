import * as TeamApiUtil from '../util/teams_api_util';
import { closeModal } from './modal_actions';

// action types
export const RECEIVE_ALL_TEAMS = "RECEIVE_ALL_TEAMS";
export const RECEIVE_TEAM = "RECEIVE_TEAM";
export const REMOVE_TEAM = "REMOVE_TEAM";

// regular action creators
const receiveAllTeams = teams => {
    return {
        type: RECEIVE_ALL_TEAMS,
        teams,
    };
};

const receiveTeam = team => {
    return {
        type: RECEIVE_TEAM,
        team,
    };
};

const removeTeam = teamId => {
    return {
        type: REMOVE_TEAM,
        teamId,
    };
};

// thunk action creators
export const fetchTeams = () => {
    return dispatch => {
        return TeamApiUtil.fetchTeams()
            .then(payload => dispatch(receiveAllTeams(payload)));
    };
}

export const fetchTeam = id => {
    return dispatch => {
        return TeamApiUtil.fetchTeam(id)
            .then(payload => dispatch(receiveTeam(payload)));
    };
}

export const createTeam = team => {
    return dispatch => {
        return TeamApiUtil.createTeam(team)
            .then(payload => {
                dispatch(receiveTeam(payload)),
                dispatch(closeModal())
            });
    };
}

export const updateTeam = team => {
    return dispatch => {
        return TeamApiUtil.updateTeam(team)
            .then(payload => {
                dispatch(receiveTeam(payload)),
                dispatch(closeModal())
            });
    };
}

export const deleteTeam = id => {
    return dispatch => {
        return TeamApiUtil.deleteTeam(id)
            .then(payload => {
                dispatch(removeTeam(id)),
                dispatch(closeModal())
            });
    };
}