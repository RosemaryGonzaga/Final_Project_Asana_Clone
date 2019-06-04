// NOTE: THIS IS A NEW ADDITION AS OF 5/31 AFTERNOON

import React from 'react';
import { merge } from 'lodash';
// import { clearErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { signup, clearErrors, login } from '../../actions/session_actions';

class SignupFormMini extends React.Component {
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

        // // // error rendering
        // let errorMessage = errors.session;  // comment this out when testing errors in state
        // let errorTooltipClass = errorMessage === "" ? "tooltip-hidden" : "tooltip-visible";

        // if (errorMessage !== "") {
        //     const { clearErrors } = this.props;
        //     setTimeout(() => {
        //         clearErrors();
        //     }, 1700)
        // }

        // // login button effect
        // let disabled = false;
        // if (primaryEmail === "") {
        //     disabled = true;
        // }

        return (
                <form className="mini-signup-form-content" onSubmit={this.handleSubmit}>

                    <input className="mini-signup-form-input email" 
                            type="email" 
                            value={primaryEmail} 
                            onChange={this.handleChange("primaryEmail")} 
                            // id="primaryEmail"   // should this be a name attribute instead?
                            placeholder="name@company.com"
                    />

                    <input className="mini-signup-form-input" 
                            type="password" 
                            value={password} 
                            onChange={this.handleChange("password")} 
                            // id="password"    // should this be a name attribute instead?
                            placeholder="password"
                    />

                    <input type="submit" value="Try for Free" className="mini-signup-form-button"/>

                </form>
        );
    }
}

// export default SignupFormMini;


const msp = (state, ownProps) => {
    const { errors } = state;
    return {
        errors,
        formType: "signup",
    };
};

const mdp = dispatch => {
    return {
        processForm: user => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors()),
        login: user => dispatch(login(user)),
    };
};

export default connect(msp, mdp)(SignupFormMini);