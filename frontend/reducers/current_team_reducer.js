import { RECEIVE_CURRENT_TEAM, RESET_CURRENT_TEAM } from '../actions/current_team_actions';

export const currentTeamReducer = (oldState = null, action) => {
    Object.freeze(oldState);
    // debugger
    switch (action.type) {
        case RECEIVE_CURRENT_TEAM:
            return action.team;
        case RESET_CURRENT_TEAM:
            return action.team;
        default:
            return oldState;
    }
};

export default currentTeamReducer;