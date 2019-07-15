import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { createTeam } from '../../actions/team_actions';
import { createTeamMembership, createTeamMembershipsByEmail } from '../../actions/team_membership_actions';
import { fetchUsers } from '../../actions/user_actions';
// import { fetchUserByEmail, fetchUsers } from '../../actions/user_actions';
// import { receiveCurrentTeam } from '../../actions/current_team_actions';


class NewTeamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Workspace or Team name", // NOTE: this info should be dispatched in createTeam
            members: "",                    // NOTE: this info should be dispatched in createTeamMembershipsByEmail (back end will handle iterating through the array and creating each membership)
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { createTeam, createTeamMembership, currentUserId, fetchUsers, createTeamMembershipsByEmail } = this.props;
        const { name, members } = this.state;

        let membersArr = members.split(',');
        membersArr = membersArr.map(email => {
            return email.trim();
        }).filter(email => {
            return email.length > 2;  // very basic email validation (only search DB if email address is greater than 1)
        });

        createTeam({ name }).then(team => {
            const teamId = team.id;
            createTeamMembership({ userId: currentUserId, teamId })
                .then(() => {
                    if (membersArr.length >= 1) {   // if additional member emails included in the new team submission
                        let data = { teamId: teamId, emails: membersArr };
                        createTeamMembershipsByEmail(data).then(() => fetchUsers(team.id)); // update the team members shown in the sidebar
                    } else {   // if NO additional member emails were included
                        fetchUsers(team.id);   // update the team members shown in the sidebar (matches newly created team)
                    }
                    // Refactored to iterate through membersArr on the backend, based on Josh's feedback --> avoids strange behavior stemming from JS aynchronicity
                    // BUT I still need to fetchUsers twice
                    // // on line 40, fetchUsers is needed to accurately show all team members when add'l ones are added at the time of team creation
                    // // on line 42, fetchUsers is needed to accurately show only one team member when the team is created WITHOUT additional users.
                })
        });
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    render() {
        const { closeModal } = this.props;
        const { name, members } = this.state;

        // NOTE about class names in the markup: I recycle the edit-project-___ class names
        // ...because the styling in this form is very similar to the EditProjectForm.
        // Trying to keep my code dry, but will need to rename some of the classes
        // ...later to make them more general and minimize confusion.
        return (
            <div className="edit-project-container new-team-container">
                <button className="edit-project-close-btn new-team-close-btn" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="edit-project-header new-team-header">
                    <h1>Create Your Workspace </h1>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="edit-project-name new-team-name">
                        <label htmlFor="NewTeamName">Workspace Name</label>
                        <input type="text" value={name} id="NewTeamName"
                            onChange={this.handleChange("name")}/>
                    </div>

                    <div className="edit-project-description new-team-members">
                        <label htmlFor="NewTeamMembers">Members</label>
                        <textarea id="NewTeamMembers"
                            value={members}
                            onChange={this.handleChange("members")}
                            placeholder="separate emails with commas">
                        </textarea>
                    </div>

                    <input type="submit" value="Create Workspace" />
                </form>

            </div>
        );
    }
}

const msp = state => {
    const currentTeam = state.ui.currentTeam;
    const currentUserId = state.session.id;
    return { currentTeam, currentUserId };
}

const mdp = dispatch => {
    return ({
        closeModal: () => dispatch(closeModal()),
        createTeam: team => dispatch(createTeam(team)),
        createTeamMembership: teamMembership => dispatch(createTeamMembership(teamMembership)),
        createTeamMembershipsByEmail: data => dispatch(createTeamMembershipsByEmail(data)),
        fetchUsers: teamId => dispatch(fetchUsers(teamId)),
        // fetchUserByEmail: email => dispatch(fetchUserByEmail(email)),
        // receiveCurrentTeam: team => dispatch(receiveCurrentTeam(team)),
    });
};

export default connect(msp, mdp)(NewTeamForm);