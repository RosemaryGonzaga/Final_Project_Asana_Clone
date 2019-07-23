import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';

class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { updateUser, closeModal, currentUser } = this.props;
        // before updating user, first need to check credentials
        updateUser({ id: currentUser.id, password: this.state.newPassword });
        closeModal();
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    render() {
        const { currentPassword, newPassword, newPasswordConfirmation } = this.state;
        const { hidePasswordForm } = this.props;

        let error1CurrentPassword = "";
        let error2PasswordLength = "";
        let error3PasswordMatch = "";

        if (currentPassword === "" && newPassword !== "") {
            error1CurrentPassword = "Must specify current password to save changes.";
        }

        if (newPassword.length > 0 && newPassword.length < 8) {
            error2PasswordLength = "Password must be 8 characters or longer.";
        }

        if ((newPassword.length > 0 || newPasswordConfirmation > 0) && newPassword !== newPasswordConfirmation) {
            error3PasswordMatch = "Passwords must match.";
        }

        let disabled = false;
        const anyEmptyFields = !currentPassword || !newPassword || !newPasswordConfirmation;    // empty strings are falsy in JS
        const anyErrors = error1CurrentPassword || error2PasswordLength || error3PasswordMatch; // empty strings are falsy in JS
        if (anyEmptyFields || anyErrors ) {
            disabled = true;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="change-password-form-current-password">
                    <label htmlFor="passwordFormCurrentPassword" className="profile-settings-label change-password-form-label">Current Password</label>
                    <input type="password" value={currentPassword} id="passwordFormCurrentPassword"
                        onChange={this.handleChange("currentPassword")}
                        className="profile-settings-input change-password-form-input" />
                </div>

                <div className="change-password-form-errors">{error1CurrentPassword}</div>

                <div className="change-password-form-new-password">
                    <label htmlFor="passwordFormNewPassword" className="profile-settings-label change-password-form-label">New Password</label>
                    <input type="password" value={newPassword} id="passwordFormNewPassword"
                        onChange={this.handleChange("newPassword")}
                        className="profile-settings-input change-password-form-input" />
                </div>

                <div className="change-password-form-errors">{error2PasswordLength}</div>

                <div className="change-password-form-new-password-confirmation">
                    <label htmlFor="passwordFormNewPasswordConfirmation" className="profile-settings-label change-password-form-label">Confirm New Password</label>
                    <input type="password" value={newPasswordConfirmation} id="passwordFormNewPasswordConfirmation"
                        onChange={this.handleChange("newPasswordConfirmation")}
                        className="profile-settings-input change-password-form-input" />
                </div>

                <div className="change-password-form-errors">{error3PasswordMatch}</div>

                <div className="change-password-form-buttons">
                    <button className="cancel-change-password" onClick={hidePasswordForm}>Cancel</button>
                    <input type="submit" value="Save" className="change-password-submit-button" disabled={disabled} />
                </div>
            </form>
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
        closeModal: () => dispatch(closeModal()),
    };
};

export default connect(msp, mdp)(ChangePasswordForm);