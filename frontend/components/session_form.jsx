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
            <div>
                <h1 className="session-form-header">{formText}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="primaryEmail">Email Address</label>
                    <input type="text" value={primaryEmail} onChange={this.handleChange("primaryEmail")} id="primaryEmail"/>

                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={this.handleChange("password")} id="password" />

                    <input type="submit" value={formText}/>
                </form>
                <p>{errorMessage}</p>
            </div>
        );
    }
}

export default SessionForm;