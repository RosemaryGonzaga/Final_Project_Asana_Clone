import React from 'react';
import { connect } from 'react-redux';
import SignupFormContainer from './auth/signup_form_container';
import LoginFormContainer from './auth/login_form_container';
import EditProjectForm from './projects/edit_project_form';
import DeleteProjectForm from './projects/delete_project_form';
import { closeModal } from '../actions/modal_actions';

const Modal = props => {
    const { modal, closeModal } = props;
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
        case "editProject":
            component = <EditProjectForm />;
            break;
        case "deleteProject":
            component = <DeleteProjectForm />;
            break;
        default:
            return null;
    }
    
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
};

const msp = (state, ownProps) => {
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