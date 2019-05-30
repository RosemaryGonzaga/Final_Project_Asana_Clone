import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../actions/session_actions';
import React from 'react';

const msp = (state, ownProps) => {
    const { errors } = state;
    return {
        errors,
        formType: "login",
    };
};

const mdp = dispatch => {
    return {
        processForm: user => dispatch(login(user)),
    };
};

class LoginFormPage extends React.Component {

    render() {
        return (
            <div className="login-page-container">
                <SessionForm {...this.props} />
                <p>This is the login form page. It is NOT a modal.</p>
            </div>
        );
    }
}


export default connect(msp, mdp)(LoginFormPage);