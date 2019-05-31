import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, clearErrors } from '../actions/session_actions';
import React from 'react';  // added this for SignupForm component
import { closeModal } from '../actions/modal_actions'; // added this for modal

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
        closeModal: () => dispatch(closeModal()),
    };
};


// I'm wrapping SessionForm in a different parent component for signup vs login
// so I can apply different styling... is there a way to make this more dry?
class SignupForm extends React.Component {

    render() {
        const { closeModal } = this.props;
        return (
            <div className="modal-wrapper">
                <SessionForm {...this.props}/>
                {/* <button onClick={closeModal}><img src="../app/assets/images/close-button.svg" alt="X"/></button> */}
                {/* <button onClick={closeModal}><img src="close-button.svg" alt="X" /></button> */}

                <button onClick={closeModal}></button>

                {/* need to include the below credit for the close modal icon? */}
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
            </div>  
        );
    }
}


export default connect(msp, mdp)(SignupForm);
// export default connect(msp, mdp)(SessionForm);