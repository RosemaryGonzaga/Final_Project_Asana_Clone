export const RECEIVE_CURRENT_TEAM = "RECEIVE_CURRENT_TEAM";
export const RESET_CURRENT_TEAM = "RESET_CURRENT_TEAM";

export const receiveCurrentTeam = team => {
    // debugger
    return ({
        type: RECEIVE_CURRENT_TEAM,
        team     // team will be an object representing a row in the teams table (with id, name, description, privacy fields)
    });
};

export const resetCurrentTeam = () => {
    return ({
        type: RESET_CURRENT_TEAM,
        team: null,    // reset to default (preloaded) state
    });
};