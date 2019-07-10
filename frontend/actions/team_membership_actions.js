import * as TeamMembershipApiUtil from '../util/team_memberships_api_util';
// import { closeModal } from './modal_actions';

// action types
export const RECEIVE_TEAM_MEMBERSHIP = "RECEIVE_TEAM_MEMBERSHIP";
export const REMOVE_TEAM_MEMBERSHIP = "REMOVE_TEAM_MEMBERSHIP";

// regular action creators
const receiveTeamMembership = teamMembership => {
    return {
        type: RECEIVE_TEAM_MEMBERSHIP,
        teamMembership,
    };
};

const removeTeamMembership = teamMembershipId => {
    return {
        type: REMOVE_TEAM_MEMBERSHIP,
        teamMembershipId,
    };
};

// thunk action creators
export const createTeamMembership = teamMembership => {
    return dispatch => {
        return TeamMembershipApiUtil.createTeamMembership(teamMembership)
            .then(payload => {
                dispatch(receiveTeamMembership(payload))
            });
    };
}

export const deleteTeamMembership = id => {
    return dispatch => {
        return TeamMembershipApiUtil.deleteTeamMembership(id)
            .then(payload => {
                dispatch(removeTeamMembership(id))
            });
    };
}