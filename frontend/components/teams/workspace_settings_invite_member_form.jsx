import React from 'react';
import { connect } from 'react-redux';
import { createTeamMembershipsByEmail } from '../../actions/team_membership_actions';
import { fetchUsers } from '../../actions/user_actions';

class InviteMemberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { currentTeam, currentUser, createTeamMembershipsByEmail, fetchUsers } = this.props;
        const { email, name } = this.state;
        if (currentUser && currentUser.primaryEmail.toUpperCase() !== email.toUpperCase()) {
            // TODO
            const data = { teamId: currentTeam.id, emails: [email] };
            createTeamMembershipsByEmail(data).then(() => fetchUsers(currentTeam.id));
        }
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    render() {
        const { email, name } = this.state;

        let disabled = true;

        // NOTE: The following criteria for email validation are based on 
        // observations on how Asana's form behaves.
        // Use ternary below to avoid throwing error when emailParts[1] or emailSuffix is undefined.
        const emailParts = email.split('@');
        const emailSuffix = emailParts[1] ? emailParts[1].split('.') : null;
        const domain = emailSuffix ? emailSuffix[emailSuffix.length - 1] : null; 
        if (email.length >= 6 && emailParts.length === 2 && emailParts[1].includes('.') && domain.length >= 2) {
            disabled = false;
        }

        return (
            <form className="invite-member-form" onSubmit={this.handleSubmit}>
                <div className="invite-member-form-inputs">
                    <div className="invite-member-form-inputs-email">
                        <label htmlFor="inviteMemberEmail">EMAIL</label>
                        <input type="email"
                                id="inviteMemberEmail"
                                value={email}
                                onChange={this.handleChange("email")}/>
                    </div>

                    <div className="invite-member-form-inputs-name">
                        <label htmlFor="inviteMemberName">NAME (OPTIONAL)</label>
                        <input type="text"
                                id="inviteMemberName"
                                value={name}
                                onChange={this.handleChange("name")}/>
                    </div>
                </div>
                
                <input type="submit" disabled={disabled} value="Send Invite"/>
            </form>
        );
    }
}

const msp = state => {
    const currentTeam = state.ui.currentTeam;
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    return { currentTeam, currentUser };
    // const users = state.entities.users;
    // return { currentTeam, currentUserId, users};
};

const mdp = dispatch => {
    return {
        createTeamMembershipsByEmail: data => dispatch(createTeamMembershipsByEmail(data)),
        fetchUsers: teamId => dispatch(fetchUsers(teamId)),
    };
};

export default connect(msp, mdp)(InviteMemberForm);