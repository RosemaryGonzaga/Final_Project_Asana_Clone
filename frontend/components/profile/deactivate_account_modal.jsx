import React from 'react';
import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';
import { resetCurrentTeam } from '../../actions/current_team_actions';
import { removeAllUsers, deleteUser } from '../../actions/user_actions';

class DeactivateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeactivateAccount = this.handleDeactivateAccount.bind(this);
    }

    handleDeactivateAccount(e) {
        const { currentUser, closeModal, logout, deleteUser, resetCurrentTeam, removeAllUsers } = this.props;
        closeModal();
        logout().then(() => {
            deleteUser(currentUser.id);
            resetCurrentTeam();
            removeAllUsers();
        });
    };

    render() {
        const { closeModal, openModal } = this.props;
        return (
            <div className="delete-project-container logout-modal-container">
                <button className="delete-project-close-btn delete-team-membership-close-btn" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>

                <h1>Account Deactivation</h1>
                <h2>Deactivation is permanent and cannot be undone. Once your account is deactivated, 
                    you can no longer log in to any Organizations or Workspaces in Shavasana.</h2>
                <button className="cancel-delete-project deactivate-account-button" onClick={() => openModal('openAccountSettings')}>Cancel</button>
                <button onClick={this.handleDeactivateAccount}
                    className="delete-project-button deactivate-account-button" >Deactivate
                </button>

            </div>
        );
    }
}

const msp = state => {
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    return { currentUser };
};

const mdp = dispatch => {
    return {
        deleteUser: (id) => dispatch(deleteUser(id)),
        closeModal: () => dispatch(closeModal()),
        logout: () => dispatch(logout()),
        resetCurrentTeam: () => dispatch(resetCurrentTeam()),
        removeAllUsers: () => dispatch(removeAllUsers()),
        openModal: modal => dispatch(openModal(modal)),
    };
};

export default connect(msp, mdp)(DeactivateAccount);