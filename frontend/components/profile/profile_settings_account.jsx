import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
// import { logout } from '../../actions/session_actions';
// import { resetCurrentTeam } from '../../actions/current_team_actions';
// import { removeAllUsers } from '../../actions/user_actions';
import ChangePasswordForm from './change_password_form';

class ProfileSettingsAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changePassword: false,
        };

        this.hidePasswordForm = this.hidePasswordForm.bind(this);
        // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    hidePasswordForm() {
        this.setState({ changePassword: false });
    }

    // handleLogoutClick(e) {
    //     const { closeModal, logout, resetCurrentTeam, removeAllUsers } = this.props;
    //     closeModal();
    //     logout().then(() => {
    //         resetCurrentTeam();
    //         removeAllUsers();
    //     });
    // };

    render() {
        const { changePassword } = this.state;
        const { openModal } = this.props;

        let passwordSection;
        if (changePassword) {
            passwordSection = (
                <section className="account-settings-section change-password-section">
                    <div className="account-settings-section-label">Password</div>
                    <ChangePasswordForm hidePasswordForm={this.hidePasswordForm}/>
                </section>
            );
        } else {
            passwordSection = (
                <section className="account-settings-section">
                    <div className="account-settings-section-label">Password</div>
                    <div className="account-settings-section-bottom">
                        <div className="account-settings-section-tagline">Change the password for your account</div>
                        <div className="account-settings-section-link" onClick={() => this.setState({ changePassword: true })}>Change password</div>
                    </div>
                </section>
            );
        }


        return (
            <div className="profile-settings-account-container">
                <section className="account-settings-section">
                    <div className="account-settings-section-label">Organizations and Workspaces</div>
                    <div className="account-settings-section-bottom">
                        <div className="account-settings-section-tagline"></div>
                        <div className="account-settings-section-link"></div>
                    </div>
                </section>

                {passwordSection}

                <section className="account-settings-section">
                    <div className="account-settings-section-label">Security</div>
                    <div className="account-settings-section-bottom">
                        <div className="account-settings-section-tagline">Log out of all sessions including this current browser</div>
                        <div className="account-settings-section-link" onClick={() => openModal('logout')}>Log out all sessions</div>
                    </div>
                </section>

                <section className="account-settings-section">
                    <div className="account-settings-section-label">Deactivation</div>
                    <div className="account-settings-section-bottom">
                        <div className="account-settings-section-tagline">Remove access to all organizations and workspaces in Asana</div>
                        <div className="account-settings-section-link">Deactivate account</div>
                    </div>
                </section>
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
        updateUser: user => dispatch(updateUser(user)),
        openModal: modal => dispatch(openModal(modal)),
        // closeModal: () => dispatch(closeModal()),
        // logout: () => dispatch(logout()),
        // resetCurrentTeam: () => dispatch(resetCurrentTeam()),
        // removeAllUsers: () => dispatch(removeAllUsers()),
    };
};

export default connect(msp, mdp)(ProfileSettingsAccount);