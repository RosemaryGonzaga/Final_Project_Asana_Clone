import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';
import { clearErrors } from '../../actions/session_actions';

class SignupFormModal extends React.Component {
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
        const { signup } = this.props;
        const user = merge({}, this.state);
        signup(user);
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

        return (
            <div className="signup-form-wrapper">
                <button className="close-btn signup-modal-close-btn" onClick={closeModal}>
                    <img src={window.closeButtonHover} alt="x" />
                </button>
                <div className="signup-form-container">
                    {/* <button className="close-btn" onClick={closeModal}>
                        <img src={window.closeButtonHover} alt="x" />
                    </button> */}
                    <div className="signup-form-header">
                        <p>{formText}</p>
                    </div>
                    <form className="signup-form-content" onSubmit={this.handleSubmit}>
                        <div className="signup-form-tagline">
                            <p>Please use your work email address, so we can connect you with your team in Asana.</p>
                        </div>

                        <div className="signup-form-email">
                            <input className="signup-form-input email"
                                type="email"
                                value={primaryEmail}
                                onChange={this.handleChange("primaryEmail")}
                                // id="primaryEmail"   // should this be a name attribute instead?
                                placeholder="name@company.com"
                            />

                            <input className="signup-form-button"
                                type="submit"
                                value={formText}
                            />
                        </div>

                        <div className="signup-form-password">
                            <input className="signup-form-input"
                                type="password"
                                value={password}
                                onChange={this.handleChange("password")}
                                // id="password"  // should this be a name attribute instead?
                                placeholder="password"
                            />
                        </div>
                        <div className="signup-form-bottom-txt">
                            <p>By signing up, I agree to the Asana</p>
                            <p> Privacy Policy </p>
                            <p>and</p>
                            <p> Terms of Service</p>
                            <p>.</p>
                        </div>
                    </form>
                </div>

                <div className="signup-modal-right">
                    <div className="signup-modal-right-content">
                        <img src={window.freeTrialRibbon} alt=""/>
                        <h3>Try Asana for free</h3>
                        <p>Teams report that Asana increases their team’s efficiency. Try it free to get access to powerful features that help you hit your goals.</p>
                        <div className="demo-button">
                            <button className="demo-button" onClick={this.handleDemoClick}>Demo</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupFormModal;