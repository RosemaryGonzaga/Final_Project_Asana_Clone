import { RECEIVE_ALL_TEAMS, RECEIVE_TEAM, REMOVE_TEAM } from '../actions/team_actions';
import { merge } from 'lodash';

const teamsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ALL_TEAMS:
            return merge({}, action.teams);
        case RECEIVE_TEAM:
            const { team } = action;
            return merge({}, oldState, { [team.id]: team });
        case REMOVE_TEAM:
            const { teamId } = action;
            let newState = merge({}, oldState);
            delete newState[teamId]
            return newState;
        default:
            return oldState;
    }
};

export default teamsReducer;