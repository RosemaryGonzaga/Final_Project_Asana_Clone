import React from 'react';
import { merge } from 'lodash';
import { clearErrors } from '../actions/session_actions';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            primaryEmail: "",
            password: "",
            // errorMessage: this.props.errors.session.slice(), // comment out when drawing errors from props
            // errorMessage: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // lifecycle methods?
    componentDidUpdate() {        // this is definitely wrong: delete!
        // debugger
        // this.setState({ errorMessage: this.props.errors.session });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { processForm } = this.props;
        const user = merge({}, this.state);
        processForm(user);
        // debugger
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    render() {
        const {primaryEmail, password } = this.state;
        const { formType, errors } = this.props;
        // const { primaryEmail, password, errorMessage } = this.state;
        // const { formType } = this.props;
        const formText = formType === "login" ? "Log In" : "Sign Up";

        // debugger
        // // error rendering
        let errorMessage = errors.session;  // comment this out when testing errors in state
        let errorTooltipClass = errorMessage === "" ? "tooltip-hidden" : "tooltip-visible";

        // need a CLEAR ERRORS ACTION!

        // debugger
        if (errorMessage !== "") {
            // debugger
            const { clearErrors } = this.props;
            setTimeout(() => {
                // debugger
                // this.setState({ errorMessage: "" });
                // alert("testing")
                clearErrors();
                // errorMessage = "";
                // errorTooltipClass = "tooltip-hidden";
            }, 1700)
            // this.render()
        }

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

                    <div className="session-form-email">
                        <label className="session-form-label" htmlFor="primaryEmail">Email Address</label>
                        <input className="session-form-input email" type="text" value={primaryEmail} onChange={this.handleChange("primaryEmail")} id="primaryEmail" title="SAMPLE TOOLTIP"/>
                        <div className={errorTooltipClass}>{errorMessage}</div>
                    </div>

                    <div className="session-form-password">
                        <label className="session-form-label" htmlFor="password">Password</label>
                        <input className="session-form-input" type="password" value={password} onChange={this.handleChange("password")} id="password" />
                    </div>

                    <div className="session-form-button">
                        <input type="submit" value={formText} disabled={disabled}/>
                    </div>                    
                </form>
            </div>
        );
    }
}

export default SessionForm;