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

        return (
            <div className="session-form-container">
                <h1 className="session-form-header">{formText}</h1>
                <form className="session-form-content" onSubmit={this.handleSubmit}>
                    <div className="session-form-google">Use Google Account</div>
                    <div className="session-form-or">or</div>

                    <div className="session-form-email">
                        <label htmlFor="primaryEmail">Email Address</label>
                        <input type="text" value={primaryEmail} onChange={this.handleChange("primaryEmail")} id="primaryEmail"/>
                    </div>

                    <div className="session-form-password">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={this.handleChange("password")} id="password" />
                    </div>

                    <div>
                        <input type="submit" value={formText}/>
                    </div>                    
                </form>
                <p>{errorMessage}</p>
            </div>
        );
    }
}

export default SessionForm;