import * as TeamMembershipApiUtil from '../util/team_memberships_api_util';
import { removeTeam } from './team_actions';
import { closeModal } from './modal_actions';
import { receiveAllUsers } from './user_actions'; // dispatch this after creating multiple TeamMemberships at once

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
    // debugger
    return dispatch => {
        // debugger
        return TeamMembershipApiUtil.createTeamMembership(teamMembership)
            .then(payload => {
                dispatch(receiveTeamMembership(payload))
            });
    };
}

// NOTE: The arg passed into createTeamMembershipsByEmail is an object with two key-value pairs:
// { teamId: teamId, emails: [email1, email2, email3, ...] }
// TeamMemberships will be created for each user (if found by their email)
export const createTeamMembershipsByEmail = data => {
    // debugger
    return dispatch => {
        // debugger
        return TeamMembershipApiUtil.createTeamMembershipsByEmail(data)
            .then(payload => {  // payload should be users that were added to the team
                // debugger
                dispatch(receiveAllUsers(payload))
            });
    };
}



// Refactored to take in teamId and userId instead of teamMembershipId
// Right now, front end state doesn't have access to any of the teamMembershipIds
// ... b/c there's no fetchTeamMemberships action (they're not being added to Redux store)
// export const deleteTeamMembership = teamMembership => { // passed in w/o the teamMembershipId
export const deleteTeamMembership = (teamMembership, keepTeamFlag) => { // passed in w/o the teamMembershipId
    return dispatch => {
        return TeamMembershipApiUtil.deleteTeamMembership(teamMembership)
            .then(payload => {
                // dispatch removeTeam instead of removeTeamMembership...
                // ... b/c TeamMemberships aren't being stored in the frontend state (currently), they don't need to be removed
                // ... but the team DOES need to be removed from Redux store, as long as the person removed from the team is the CURRENT USER
                // ... The 2nd arg passed into this thunk action creator is an optional flag signalling whether to remove the team from the Redux store.
                // ... If the person removed from the team is the current user, keepTeamFlag will be undefined, so !keepTeamFlag will be truthy.
                // ... Otherwise, keepTeamFlag will be truthy, and !keepTeamFlag will be falsy (and the removeTeam action creator will NOT be dispatched)
                if (payload.userId === teamMembership.userId && !keepTeamFlag) { // close over teamMembership that was passed into thunk action creator
                    dispatch(removeTeam(payload.teamId));
                }
            });
    };
}

// // THE OLD WAY
// export const deleteTeamMembership = id => {
//     return dispatch => {
//         return TeamMembershipApiUtil.deleteTeamMembership(id)
//             .then(payload => {
//                 dispatch(removeTeamMembership(id))
//             });
//     };
// }