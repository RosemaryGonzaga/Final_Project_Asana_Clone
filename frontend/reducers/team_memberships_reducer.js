import { RECEIVE_TEAM_MEMBERSHIP, REMOVE_TEAM_MEMBERSHIP } from '../actions/team_membership_actions';
import { merge } from 'lodash';

const teamMembershipsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_TEAM_MEMBERSHIP:
            const { teamMembership } = action;
            return merge({}, oldState, { [teamMembership.id]: teamMembership });
        case REMOVE_TEAM_MEMBERSHIP:
            const { teamMembershipId } = action;
            let newState = merge({}, oldState);
            delete newState[teamMembershipId]
            return newState;
        default:
            return oldState;
    }
};

export default teamMembershipsReducer;