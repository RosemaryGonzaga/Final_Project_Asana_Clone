import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, clearErrors } from '../actions/session_actions';
import React from 'react';  // added this for SignupForm component

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
    };
};


// I'm wrapping SessionForm in a different parent component for signup vs login
// so I can apply different styling... is there a way to make this more dry?
class SignupForm extends React.Component {

    render() {
        return (
            <div>
                <SessionForm {...this.props}/>
                <p>Hello from the signup form! I'm supposed to be a modal. Style me then remove me later.</p>
            </div>  
        );
    }
}


export default connect(msp, mdp)(SignupForm);
// export default connect(msp, mdp)(SessionForm);