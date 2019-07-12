import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { createTeam } from '../../actions/team_actions';
import { createTeamMembership } from '../../actions/team_membership_actions';
import { fetchUserByEmail, fetchUsers } from '../../actions/user_actions';
import { receiveCurrentTeam } from '../../actions/current_team_actions';


class NewTeamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Workspace or Team name", // NOTE: this info should be dispatched in createTeam
            members: "",                    // NOTE: this info should be dispatched in createTeamMembership (one at a time?)
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { createTeam, createTeamMembership, currentUserId, fetchUserByEmail, receiveCurrentTeam, fetchUsers } = this.props;
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
                    if (membersArr.length >= 1) {   
                        membersArr.forEach(email => {
                            fetchUserByEmail(email).then(response => {  // response = {type: "RECEIVE_USER", user: {…}} 
                                const userId = response.user.id;
                                createTeamMembership({ userId, teamId }).then(() => fetchUsers(team.id)); // need this fetchUsers so the last add'l team member is displayed in the sidebar
                                // option 2: dispatch receiveCurrentTeam at the same time that receiveTeam is dispatched
                                // ... in the createTeam thunk action creator (generally, when you create a new team, you'll always want to switch to it.)
                                // option 3: Josh's suggestion of iterating on the back end --> GO FOR THIS!
                                // NOTE: the current implementation that chains fetchUsers onto createTeamMembership...
                                // ...seems unideal. We're also fetching Users again later (inefficient), plus there's a blip
                                // ...where you can briefly see the users from the previously displayed team.

                                // IMPORTANT TO KEEP IN MIND ABOUT THIS LOOP AND JS ASYNCH:
                                // the success CB (where createTeamMembership is invoked) will only be invoked
                                // AFTER the entire forEach loop has finished iterating!
                                // all synchronous actions execute before asynch actions
                            })
                        });
                    }
                    // Refactored to dispatch receiveCurrentTeam when the new team is created
                    // (in the createTeam thunk action creator)
                    // So I don't need to dispatch receiveCurrentTeam here
                    // BUT I still need to fetchUsers twice
                    // // on line 39, fetchUsers is needed to accurately show all team members when add'l ones are added at the time of team creation
                    // // on line 60, fetchUsers is needed to accurately show only one team member when the team is created WITHOUT additional users.
                    fetchUsers(team.id);   // need to fetch users that are part of the new team (this will update the team members shown in the sidebar)
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
        fetchUserByEmail: email => dispatch(fetchUserByEmail(email)),
        receiveCurrentTeam: team => dispatch(receiveCurrentTeam(team)),
        fetchUsers: teamId => dispatch(fetchUsers(teamId)),
    });
};

export default connect(msp, mdp)(NewTeamForm);