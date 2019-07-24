import React from 'react';
import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';
import { resetCurrentTeam } from '../../actions/current_team_actions';
import { removeAllUsers } from '../../actions/user_actions';

class LogoutModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick(e) {
        const { closeModal, logout, resetCurrentTeam, removeAllUsers } = this.props;
        closeModal();
        logout().then(() => {
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

                <h1>Log out all sessions</h1>
                <h2>Logging out will sign you out of all web browsers and mobile apps including this current browser. 
                    This will not reset your password.</h2>
                {/* <button className="cancel-delete-project logout-modal-button" onClick={closeModal}>Cancel</button> */}
                <button className="cancel-delete-project logout-modal-button" onClick={() => openModal('openAccountSettings')}>Cancel</button>
                <button onClick={this.handleLogoutClick}
                    className="delete-project-button logout-modal-button" >Log out all sessions
                </button>

            </div>
        );
    }
}

// const msp = state => {
//     const currentUserId = state.session.id;
//     const currentUser = state.entities.users[currentUserId];
//     return { currentUser };
// };

const mdp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        logout: () => dispatch(logout()),
        resetCurrentTeam: () => dispatch(resetCurrentTeam()),
        removeAllUsers: () => dispatch(removeAllUsers()),
        openModal: modal => dispatch(openModal(modal)),
    };
};

export default connect(null, mdp)(LogoutModal);