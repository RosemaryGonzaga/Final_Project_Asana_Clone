import React from 'react';
import Splash from './splash';
import SignupFormContainer from './auth/signup_form_container';
import LoginFormContainer from './auth/login_form_container';
import LoginFormContainerPageLayout from './auth/login_form_container_page_layout';
import Home from './home';
import NewProjectForm from './projects/new_project_form';
import ProjectIndexContainer from './projects/project_index_container';
import ProjectShowContainer from './projects/project_show_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal';
import { Route, Switch } from 'react-router-dom';
import EditProjectForm from './projects/edit_project_form';


const App = () => {

    return (
        <div>
            <Modal />
            <AuthRoute exact path="/" component={Splash} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/login_page" component={LoginFormContainerPageLayout} />
            <ProtectedRoute path="/projects/new" component={NewProjectForm} />
            <ProtectedRoute path="/home" component={Home} />
            {/* <Switch>
                <ProtectedRoute exact path="/projects/:projectId" component={ProjectShowContainer} />
                <ProtectedRoute exact path="/projects" component={ProjectIndexContainer} />
            </Switch> */}


            <ProtectedRoute path="/edit-project" component={EditProjectForm} />
        </div>
    );
};

export default App;