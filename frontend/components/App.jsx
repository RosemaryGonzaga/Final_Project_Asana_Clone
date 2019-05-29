import React from 'react';
import SignupFormContainer from './signup_form_container';
import LoginFormContainer from './login_form_container';
import { Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <h1>Shavasana</h1>
            <Route path="/signup" component={SignupFormContainer}/>
            <Route path="/login" component={LoginFormContainer} />
        </div>
    );
};

export default App;