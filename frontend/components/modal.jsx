import React from 'react';
import { connect } from 'react-redux';
import SignupFormContainer from './auth/signup_form_container';
import LoginFormContainer from './auth/login_form_container';
import EditProjectForm from './projects/edit_project_form';
import DeleteProjectForm from './projects/delete_project_form';
import NewTeamForm from './teams/new_team_form';
import TaskModal from './tasks/task_modal_container';
import DeleteTeamMembershipForm from './teams/delete_team_membership_form';
import WorkspaceSettings from './teams/workspace_settings';
import ProfileSettings from './profile/profile_settings_tabs';
import LogoutModal from './profile/account_settings_logout_modal';
import DeactivateAccount from './profile/deactivate_account_modal';
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
        case "editTask":
            component = <TaskModal />;
            break;
        case  "createTeam":
            component = <NewTeamForm />;
            break;  
            // IMPORTANT: remember to put this break statement... 
            // otherwise, instead of rendering NewTeamForm component, this will return null!
            // (you won't hit the render function of the NewTeamForm component)
        case "removeUserFromTeam":
            component = <DeleteTeamMembershipForm />;
            break;
        case "editTeamGeneralSettings":
            component = <WorkspaceSettings selectedTab="General"/>;
            break;
        case "editTeamMemberSettings":
            component = <WorkspaceSettings selectedTab="Members" />;
            break;
        case "openProfileSettings":
            component = <ProfileSettings selectedTab="Profile"/>;
            break;
        case "openAccountSettings":
            component = <ProfileSettings selectedTab="Account"/>;
            break;
        case "logout":
            component = <LogoutModal />;
            break;
        case "deactivateAccount":
            component = <DeactivateAccount />;
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