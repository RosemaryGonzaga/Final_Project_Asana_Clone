import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

// accessible only by ppl that are logged OUT (renders component if logged out)
    // need to think more about where to redirect to, once I have more views (components) set up
    // WARNING: if you pass the wrong path into the "to" attribute, you could get into an infinite loop!
        // example: <Redirect to="/" /> in the Auth component (if the Auth path is "/")
const Auth = ({ component: Component, loggedIn, exact, path }) => {
    return (
        <Route path={path} exact={exact} render={props => (
            !loggedIn ? <Component {...props} /> : <Redirect to ="/home" />
        )}/>
    );
};

// accessible only by ppl that are logged IN (renders component if logged in)
const Protected = ({ component: Component, loggedIn, exact, path }) => {
    return (
        <Route path={path} exact={exact} render={props => (
            loggedIn ? <Component {...props} /> : <Redirect to="/login_page" />
        )}/>
    );
};

const msp = (state, ownProps) => {
    return ({
        loggedIn: Boolean(state.session.id)
    });
};

export const AuthRoute = withRouter(connect(msp)(Auth));
export const ProtectedRoute = withRouter(connect(msp)(Protected));