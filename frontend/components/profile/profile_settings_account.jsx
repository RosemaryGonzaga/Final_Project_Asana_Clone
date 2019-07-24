import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import { selectAllTeams } from '../../reducers/selectors';
// import { logout } from '../../actions/session_actions';
// import { resetCurrentTeam } from '../../actions/current_team_actions';
// import { removeAllUsers } from '../../actions/user_actions';
import ChangePasswordForm from './change_password_form';

class ProfileSettingsAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changePassword: false,
            showPasswordErrors: false,
        };

        this.hidePasswordForm = this.hidePasswordForm.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    hidePasswordForm(e) {
        e.preventDefault();
        this.setState({ changePassword: false });
    }

    renderErrors() {
        this.setState({ showPasswordErrors: true });
    }

    render() {
        const { changePassword, showPasswordErrors } = this.state;
        const { openModal, teams } = this.props;

        // Password form errors
        let passwordErrors = null;
        if (showPasswordErrors) {
            passwordErrors = (
                <div className="account-settings-errors">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>You have entered your current password incorrectly.</span>
                </div>
            );
        }

        // Conditionally render password section or form
        let passwordSection;
        if (changePassword) {
            passwordSection = (
                <section className="account-settings-section change-password-section">
                    <div className="account-settings-section-label">Password</div>
                    <ChangePasswordForm hidePasswordForm={this.hidePasswordForm} renderErrors={this.renderErrors}/>
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

        // User's workspaces (teams)
        let userTeams = null;
        if (teams) {
            userTeams = teams.map(team => <li key={team.id}>{team.name}</li>);
            userTeams.push(
                <li key="createTeam" onClick={() => openModal('createTeam')}
                    className="account-settings-create-new-workspace">Create new workspace</li>
            );
        }


        return (
            <div className="profile-settings-account-container">

                {passwordErrors}

                <section className="account-settings-section">
                    <div className="account-settings-section-label workspaces">Organizations and Workspaces</div>
                    <div className="account-settings-section-bottom workspaces">
                        <div className="account-settings-workspaces-left">
                            <div className="account-settings-section-tagline workspaces">Workspaces</div>
                        </div>
                        <ul className="account-settings-workspaces-right">
                            {userTeams}
                        </ul>
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
                        <div className="account-settings-section-link" onClick={() => openModal('deactivateAccount')}>Deactivate account</div>
                    </div>
                </section>
            </div>
        );
    }
}

const msp = state => {
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    const teams = selectAllTeams(state);
    return { currentUser, teams };
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