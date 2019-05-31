import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, clearErrors } from '../actions/session_actions';
import { openModal, closeModal } from '../actions/modal_actions';
import React from 'react';  // added this for LoginForm component

const msp = (state, ownProps) => {
    const { errors } = state;
    return {
        errors,
        formType: "login",
    };
};

const mdp = dispatch => {
    return {
        processForm: user => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors()),
        otherForm: (
            <button onClick={() => dispatch(openModal('signup'))}>
                Signup
            </button>
        ),
        closeModal: () => dispatch(closeModal()),
    };
};


// I'm wrapping SessionForm in a different parent component for signup vs login
// so I can apply different styling... is there a way to make this more dry?
class LoginForm extends React.Component {

    render() {
        const { closeModal } = this.props;
        return (
            <div className="modal-wrapper">
                <SessionForm {...this.props} />
                <button onClick={closeModal}></button>
            </div>
        );
    }
}


export default connect(msp, mdp)(LoginForm);
// export default connect(msp, mdp)(SessionForm);