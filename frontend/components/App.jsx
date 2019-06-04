import React from 'react';
import Splash from './splash';
import SignupFormContainer from './auth/signup_form_container';
import LoginFormContainer from './auth/login_form_container';
import LoginFormContainerPageLayout from './auth/login_form_container_page_layout';
import Home from './home';
import NewProjectForm from './projects/new_project_form';
import ProjectShowContainer from './projects/project_show_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal';
import { Route } from 'react-router-dom';


const App = () => {
    // NOTE: All routes should live at the top level (in App component)!
    // REPEAT: Put all routes here! Don't keep making this mistake...
    // Each component in each route should then render the appropriate buttons (links?) the redirect to those routes


    // Updated Note (as of Mon 6/3 pm): the last ProtectedRoute (path="/projects/:projectId", rendering Home) breaks my new project form
    // the error message when I try to click the "New" button to create new proejct: "history cannot PUSH the same path; a new entry will not be added to the history stack"

    return (
        <div>
            <Modal />
            <AuthRoute exact path="/" component={Splash} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/login_page" component={LoginFormContainerPageLayout} />
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/projects/new" component={NewProjectForm} />
            {/* <ProtectedRoute path="/projects/:projectId" component={ProjectShowContainer} /> */}
            <ProtectedRoute exact path="/projects/:projectId" component={Home} />
        </div>
    );
};

export default App;