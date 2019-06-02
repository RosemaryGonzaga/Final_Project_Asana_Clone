import { connect } from 'react-redux';
import SignupFormModal from './signup_form_modal';
import { signup, clearErrors, login } from '../../actions/session_actions';
import React from 'react';  // added this for SignupForm component
import { closeModal } from '../../actions/modal_actions'; // added this for modal

const msp = (state, ownProps) => {
    const { errors } = state;
    return {
        errors,
        formType: "signup",
    };
};

const mdp = dispatch => {
    return {
        signup: user => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors()),
        closeModal: () => dispatch(closeModal()),
        login: user => dispatch(login(user)),
    };
};


export default connect(msp, mdp)(SignupFormModal);