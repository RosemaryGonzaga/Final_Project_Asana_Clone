import React from 'react';
import { merge } from 'lodash';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            primaryEmail: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // lifecycle methods?

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
        const {primaryEmail, password} = this.state;
        const { formType, errors } = this.props;
        const formText = formType === "login" ? "Log In" : "Sign Up";
        const errorMessage = errors.session;
        // added the below code...need to test...
        let disabled = false;
        // debugger
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

                    <div className="session-form-email">
                        <label className="session-form-label" htmlFor="primaryEmail">Email Address</label>
                        <input className="session-form-input"type="text" value={primaryEmail} onChange={this.handleChange("primaryEmail")} id="primaryEmail"/>
                    </div>

                    <div className="session-form-password">
                        <label className="session-form-label" htmlFor="password">Password</label>
                        <input className="session-form-input" type="password" value={password} onChange={this.handleChange("password")} id="password" />
                    </div>

                    <div className="session-form-button">
                        <input type="submit" value={formText} disabled={disabled}/>
                    </div>                    
                </form>
                <p>{errorMessage}</p>
            </div>
        );
    }
}

export default SessionForm;