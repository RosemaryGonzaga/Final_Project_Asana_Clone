import React from 'react';
import { connect } from 'react-redux';
import SignupFormContainer from './signup_form_container';
import LoginFormContainer from './login_form_container';
import { closeModal } from '../actions/modal_actions';

const Modal = props => {
    const { modal, closeModal } = props;
    // debugger
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case "login":
            component = <LoginFormContainer />;
            break;
        case "signup":
            component = <SignupFormContainer />;
            break;
        default:
            return null;
    }
    // debugger
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
};

const msp = (state, ownProps) => {
    // debugger
    return {
        modal: state.ui.modal,
    };
};

const mdp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(msp, mdp)(Modal);