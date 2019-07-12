import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Link, withRouter } from 'react-router-dom';
import { deleteTeamMembership } from '../../actions/team_membership_actions';
import { closeModal } from '../../actions/modal_actions';
import { receiveCurrentTeam } from '../../actions/current_team_actions';
import { selectAllTeams } from '../../reducers/selectors';
import { fetchUsers } from '../../actions/user_actions';

class DeleteTeamMembershipForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // e.preventDefault(); // remember: preventDefault would stop the Link from routing to '/home'
        const { currentTeam, currentUserId, teams, deleteTeamMembership, closeModal, receiveCurrentTeam, fetchUsers  } = this.props;
        
        let newTeam;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].id !== currentTeam.id) {
                newTeam = teams[i];
                break;
            }
        }
        deleteTeamMembership({ teamId: currentTeam.id, userId: currentUserId })
            .then(closeModal());
            // .then(receiveCurrentTeam(newTeam))
            // .then(fetchUsers(newTeam.id));
        if (newTeam) {
            receiveCurrentTeam(newTeam);   // when the current user is removed from the team, reset the currentTeam (in frontend state)
            fetchUsers(newTeam.id);        // need to fetch users that are part of the new team (this will update the team members shown in the sidebar)
        }
    }

    render() {
        const { closeModal, currentTeam } = this.props;
        return (
            <div className="delete-project-container">
                <button className="delete-project-close-btn" onClick={closeModal}>
                    <img src={window.closeButtonHover} alt="x" />
                </button>

                <h1>Remove Yourself from the Workspace?</h1>
                <h2>If you remove yourself, you won't be able to access any of the projects or tasks in {currentTeam.name}. 
                    If you want to regain access, you'll need to ask a coworker to invite you to the workspace again.</h2>
                <button className="cancel-delete-project" onClick={closeModal}>Cancel</button>
                <Link to="/home" onClick={this.handleClick}
                    className="delete-project-button" >Delete
                </Link>

            </div>
        );
    }
}

const msp = (state) => {
    const teams = selectAllTeams(state);
    const currentUserId = state.session.id;
    const currentTeam = state.ui.currentTeam;
    return ({ currentUserId, currentTeam, teams });
};

const mdp = dispatch => {
    return {
        deleteTeamMembership: id => dispatch(deleteTeamMembership(id)),
        closeModal: () => dispatch(closeModal()),
        receiveCurrentTeam: team => dispatch(receiveCurrentTeam(team)),
        fetchUsers: teamId => dispatch(fetchUsers(teamId)),
    };
}

export default connect(msp, mdp)(DeleteTeamMembershipForm);
// export default withRouter(connect(msp, mdp)(DeleteTeamMembershipForm));