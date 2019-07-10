import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { createTeam } from '../../actions/team_actions';
import { createTeamMembership } from '../../actions/team_membership_actions';
// import { clearAllUsers, fetchUsers } from '../../actions/user_actions';


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
        const { createTeam, createTeamMembership, currentUserId } = this.props;
        const { name, members } = this.state;
        createTeam({ name }).then(team => {
            const teamId = team.id;
            createTeamMembership({ userId: currentUserId, teamId })   // also do this for the other members
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
        // clearAllUsers: () => dispatch(clearAllUsers()),
        // fetchUsers: teamId => dispatch(fetchUsers(teamId)),
    });
};

export default connect(msp, mdp)(NewTeamForm);