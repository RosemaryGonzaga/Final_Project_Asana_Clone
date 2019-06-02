import { connect } from 'react-redux';
import LoginFormPage from './login_form_page_layout';
import { login, clearErrors } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import React from 'react';
import { Link } from 'react-router-dom';

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
        clearErrors: () => dispatch(clearErrors()),
        openSignupModal: () => dispatch(openModal('signup')),
    };
};

class LoginFormPageContainer extends React.Component {

    render() {
        return (
            <div className="login-page-container">
                <div className="login-page-cushion">
                    <img src={window.asanaLogoWhite} alt="Asana Logo White"/>
                </div>
                <div className="session-form-wrapper">
                    <LoginFormPage {...this.props} />
                    <footer className="login-page-footer">
                        <div className="login-page-footer-top">
                            <p>Don't have an account?</p>
                            <Link to="/" 
                                    className="login-page-signup-wrapper" 
                                    onClick={this.props.openSignupModal}>
                                    Sign Up
                            </Link>
                        </div>
                        <div className="login-page-footer-bottom">
                            <nav>
                                <a href="#">About Asana</a>
                                <a href="#">Blog</a>
                                <a href="#">Jobs</a>
                                <a href="#">Help</a>
                                <a href="#">Terms</a>
                            </nav>
                        </div>
                    </footer>
                </div>
               <div className="login-page-cushion" ></div>
            </div>
        );
    }
}


export default connect(msp, mdp)(LoginFormPageContainer);