import { connect } from 'react-redux';
import SessionForm from './session_form';
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
        processForm: user => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors()),
        closeModal: () => dispatch(closeModal()),
        login: user => dispatch(login(user)),
    };
};


// I'm wrapping SessionForm in a different parent component for signup vs login
// so I can apply different styling... is there a way to make this more dry?
class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleDemoClick = this.handleDemoClick.bind(this);
    }

    handleDemoClick(e) {
        e.preventDefault();
        const { login } = this.props;
        const demoUser = { primaryEmail: "user1@shavasana.com", password: "password" }
        login(demoUser);
    }

    render() {
        const { closeModal } = this.props;
        // const demoUser = { primaryEmail: "user1@shavasana.com", password: "password" }
        return (
            <div className="modal-wrapper">
                <SessionForm {...this.props}/>
                {/* <button onClick={closeModal}><img src="../app/assets/images/close-button.svg" alt="X"/></button> */}
                {/* <button onClick={closeModal}><img src="close-button.svg" alt="X" /></button> */}

                <button className="close-btn" onClick={closeModal}>
                    <img src={window.closeButtonHover} alt="x"/>
                </button>
                <button className="demo-btn" onClick={this.handleDemoClick}>Demo</button>

                {/* need to include the below credit for the close modal icon? */}
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
            </div>  
        );
    }
}


export default connect(msp, mdp)(SignupForm);