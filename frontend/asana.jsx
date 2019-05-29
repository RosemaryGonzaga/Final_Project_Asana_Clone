import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';


// imported these for testing only (remove later):
import * as SessionApiUtil from './util/session_api_util';
import * as ThunkActions from './actions/session_actions';


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

    // for testing only! DELETE LATER!
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // delete the above!
});



// // TESTING ONLY! REMOVE FROM WINDOW LATER!!!!
// window.signup = SessionApiUtil.signup
// window.login = SessionApiUtil.login
// window.logout = SessionApiUtil.logout
window.signupThunk = ThunkActions.signup
window.loginThunk = ThunkActions.login
window.logoutThunk = ThunkActions.logout