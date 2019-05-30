import React from 'react';
import SignupFormContainer from './signup_form_container';
import LoginFormContainer from './login_form_container';
import LoginFormContainerPageLayout from './login_form_container_page_layout';
import Home from './home';
import Splash from './splash';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    // NOTE: All routes should live at the top level (in App component)!
    // Each component in each route should then render the appropriate buttons (links?) the redirect to those routes

    return (
        <div>
            {/* <h1>Shavasana</h1> */}
            <ProtectedRoute exact path="/home" component={Home} />
            <AuthRoute exact path="/" component={Splash} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/login_page" component={LoginFormContainerPageLayout} />
        </div>
    );
};

export default App;