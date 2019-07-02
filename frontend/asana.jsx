import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';


// imported these for testing only (remove later):
import * as TeamApiUtil from './util/teams_api_util';
import * as TeamMembershipApiUtil from './util/team_memberships_api_util';
import * as ThunkActions from './actions/team_actions';
import * as TeamMembershipThunkActions from './actions/team_membership_actions';


document.addEventListener('DOMContentLoaded', () => {
    let preloadedState = {}
    if (window.currentUser) {   // bootstrap currentUser to window
        preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        delete window.currentUser;  // clean up after ourselves
    }
    const store = configureStore(preloadedState);
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, root)

    // // for testing only! DELETE LATER!
    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    // // delete the above!
});



// // TESTING ONLY! REMOVE FROM WINDOW LATER!!!!
// window.signup = SessionApiUtil.signup
// window.login = SessionApiUtil.login
// window.logout = SessionApiUtil.logout
// window.signupThunk = ThunkActions.signup
// window.loginThunk = ThunkActions.login
// window.logoutThunk = ThunkActions.logout
// window.fetchTeams = TeamApiUtil.fetchTeams;
// window.fetchTeam = TeamApiUtil.fetchTeam;
// window.createTeam = TeamApiUtil.createTeam;
// window.updateTeam = TeamApiUtil.updateTeam;
// window.deleteTeam = TeamApiUtil.deleteTeam;
// window.createTeamMembership = TeamMembershipApiUtil.createTeamMembership;
// window.deleteTeamMembership = TeamMembershipApiUtil.deleteTeamMembership;
// window.fetchTeamsThunk = ThunkActions.fetchTeams;
// window.fetchTeamThunk = ThunkActions.fetchTeam;
// window.createTeamThunk = ThunkActions.createTeam;
// window.updateTeamThunk = ThunkActions.updateTeam;
// window.deleteTeamThunk = ThunkActions.deleteTeam;
// window.createTeamMembershipThunk = TeamMembershipThunkActions.createTeamMembership;
// window.deleteTeamMembershipThunk = TeamMembershipThunkActions.deleteTeamMembership;