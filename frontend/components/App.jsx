import React from 'react';
import SignupFormContainer from './signup_form_container';
import LoginFormContainer from './login_form_container';
import LoginFormContainerPageLayout from './login_form_container_page_layout';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    // playing around with this component --> need to render a user welcome page when signed in, and it will have the logout button inside of it
    // const signOutButton = <ProtectedRoute path="/logout" component={LogoutButton} />;

    return (
        <div>
            <h1>Shavasana</h1>
            <AuthRoute path="/signup" component={SignupFormContainer}/>
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/login_page" component={LoginFormContainerPageLayout} />
        </div>
    );
};

export default App;