import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';
import { clearErrors } from '../../actions/session_actions';

class LoginFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            primaryEmail: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemoClick = this.handleDemoClick.bind(this);
    }

    // lifecycle methods?

    handleSubmit(e) {
        e.preventDefault();
        const { login } = this.props;
        const user = merge({}, this.state);
        login(user);
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleDemoClick(e) {
        e.preventDefault();
        const { login } = this.props;
        const demoUser = { primaryEmail: "user1@shavasana.com", password: "password" }
        login(demoUser);
    }

    render() {
        const { primaryEmail, password } = this.state;
        const { formType, errors, closeModal, otherForm } = this.props;
        const formText = formType === "login" ? "Log in" : "Sign up";

        // error rendering
        let errorMessage = errors.session;
        let errorTooltipClass = errorMessage === "" ? "tooltip-hidden" : "tooltip-visible";

        if (errorMessage !== "") {
            const { clearErrors } = this.props;
            setTimeout(() => {
                clearErrors();
            }, 1700)
        }

        // login button effect
        let disabled = false;
        if (primaryEmail === "") {
            disabled = true;
        }

        return (
            <div className="login-form-container">
                <button className="close-btn" onClick={closeModal}>
                    <img src={window.closeButtonHover} alt="x" />
                </button>
                <div className="login-form-header">
                    <p>{formText}</p>
                </div>
                <form className="login-form-content" onSubmit={this.handleSubmit}>
                    <div className="login-form-google-container">
                        <i className="fab fa-google"></i>
                        <button className="login-form-google">Use Google Account</button>
                    </div>

                    {/* <button className="login-form-google">
                        <i className="fab fa-google"></i>
                        Use Google Account
                    </button> */}
                    
                    <div className="login-form-or">
                        <div className="login-form-line"></div>
                        <span>or</span>
                        <div className="login-form-line"></div>
                    </div>

                    <div className="login-form-email">
                        <label className="login-form-label" htmlFor="primaryEmail">Email Address</label>
                        <input className="login-form-input email" 
                                type="email" 
                                value={primaryEmail} 
                                onChange={this.handleChange("primaryEmail")} 
                                id="primaryEmail" 
                                placeholder="name@company.com"
                        />
                        <div className={errorTooltipClass}>{errorMessage}</div>
                    </div>

                    <div className="login-form-password">
                        <label className="login-form-label" htmlFor="password">Password</label>
                        <input className="login-form-input" 
                                type="password" 
                                value={password} 
                                onChange={this.handleChange("password")} 
                                id="password"
                                placeholder="password" 
                        />
                    </div>

                    <input className="login-form-button" 
                            type="submit" 
                            value={formText} 
                            disabled={disabled} 
                    />

                    <div className="demo-button">
                        <button className="demo-button" onClick={this.handleDemoClick}>Demo</button>
                    </div>

                    <div className="login-form-bottom-txt">
                        <p>Forgot password?</p>
                        <p className="redirect-to-signin">
                            <span>Don’t have an account?</span>
                            <span>{otherForm}</span>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginFormModal;