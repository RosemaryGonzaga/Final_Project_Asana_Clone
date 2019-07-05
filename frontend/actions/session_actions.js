import * as SessionApiUtil from '../util/session_api_util';
import { closeModal } from './modal_actions';
import { resetNavHeader } from './nav_header_actions';
import { resetMainContent } from './main_content_actions';

// // New as of 7/4: bundle fetch Teams and current Team with login ... to avoid error thrown by keying into undefined currentTeam (before it's added to Redux store)
//     // NVM... receive currentTeam happens after projectIndex mounts (which is when I access currentTeam from Redux store and try to key into it)
// import { fetchTeams } from './team_actions';
// import { receiveCurrentTeam } from './current_team_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS"; // ADDED THIS!

// regular action creators

const receiveCurrentUser = currentUser => {
    return {
        type: RECEIVE_CURRENT_USER,
        currentUser,
    };
};

const logoutCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER,
    };
};

const receiveErrors = errors => {   // naming implies the arg is an array, but right now I'm only passing up a single string
    return {
        type: RECEIVE_ERRORS,
        errors,              
    };
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    }
}


// thunk action creators

export const signup = user => {
    return dispatch => {
        return SessionApiUtil.signup(user)
            .then(
                successPayload => {
                    dispatch(receiveCurrentUser(successPayload)),
                    dispatch(closeModal())
                },
                rejectPromise => dispatch(receiveErrors(rejectPromise.responseJSON.errors))
            )
    };
};

export const login = user => {
    return dispatch => {
        return SessionApiUtil.login(user)
            .then(
                successPayload => {
                    dispatch(receiveCurrentUser(successPayload)),
                    dispatch(closeModal())
                    // dispatch(receiveCurrentUser(successPayload));
                    // dispatch(closeModal());
                    // dispatch(fetchTeams()).then(payload => {
                    //     debugger // all of these async actions happen after project index and home components mount
                    //     const teamId = Object.keys(payload.teams)[0];
                    //     const team = payload.teams[teamId];
                    //     dispatch(receiveCurrentTeam(team));
                    // });
                },
                rejectPromise => {
                    return dispatch(receiveErrors(rejectPromise.responseJSON.errors))
                }
            )
            // ).then(payload => dispatch(fetchTeams())).then(payload => {
            //     debugger
            //     const teamId = Object.keys(payload.teams)[0];
            //     const team = payload.teams[teamId];
            //     dispatch(receiveCurrentTeam(team));
            // });
    };
};

export const logout = () => {
    return dispatch => {
        return SessionApiUtil.logout()
            .then(
                () => {
                    dispatch(logoutCurrentUser()),
                    dispatch(resetNavHeader()),     // 6.3: added two more actions to the .then success callback
                    dispatch(resetMainContent())    // added these to address recently introduced bugs...
                }
        )
    };
};