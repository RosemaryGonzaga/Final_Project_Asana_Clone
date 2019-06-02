import React from 'react';
import { merge } from 'lodash';
import { clearErrors } from '../../actions/session_actions';

class LoginFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            primaryEmail: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { processForm } = this.props;
        const user = merge({}, this.state);
        processForm(user);
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    render() {
        const { primaryEmail, password } = this.state;
        const { formType, errors } = this.props;
        const formText = formType === "login" ? "Log In" : "Sign Up";

        // // error rendering
        const errorMessage1 = "The username or password is not correct.";
        const errorMessage2 = "Did you forget your password?";
        const errorClass = errors.session === "" ? "error-message-hidden" : "error-message-visible";
        // const sessionFormContainerClass = errors.session === "" ? "session-form-container" : "session-form-container-errors";

        // let errorTooltipMessage = errors.session;
        // let errorTooltipClass = errorTooltipMessage === "" ? "tooltip-hidden" : "tooltip-visible";

        // if (errorTooltipMessage !== "") {
        //     const { clearErrors } = this.props;
        //     setTimeout(() => {
        //         clearErrors();
        //     }, 1700)
        // }

        // login button effect
        let disabled = false;
        if (primaryEmail === "") {
            disabled = true;
        }

        return (
            <div className="session-form-container">
                <div className="session-form-header">
                    <p>{formText}</p>
                </div>
                <form className="session-form-content" onSubmit={this.handleSubmit}>
                    <button className="session-form-google">Use Google Account</button>
                    <div className="session-form-or">
                        <div className="session-form-line"></div>
                        <span>or</span>
                        <div className="session-form-line"></div>
                    </div>

                    <div className={errorClass}>
                        <p className={errorClass}>{errorMessage1}</p>
                        <p className={errorClass}>{errorMessage2}</p>
                    </div>

                    <div className="session-form-email">
                        <label className="session-form-label" htmlFor="primaryEmail">Email Address</label>
                        <input className="session-form-input email" type="text" value={primaryEmail} onChange={this.handleChange("primaryEmail")} id="primaryEmail" title="SAMPLE TOOLTIP" />
                        {/* <div className={errorTooltipClass}>{errorTooltipMessage}</div> */}
                    </div>

                    <div className="session-form-password">
                        <label className="session-form-label" htmlFor="password">Password</label>
                        <input className="session-form-input" type="password" value={password} onChange={this.handleChange("password")} id="password" />
                    </div>

                    <div className="session-form-button">
                        <input type="submit" value={formText} disabled={disabled} />
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginFormPage;