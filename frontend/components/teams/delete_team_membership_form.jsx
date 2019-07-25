import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Link, withRouter } from 'react-router-dom';
import { deleteTeamMembership } from '../../actions/team_membership_actions';
import { closeModal } from '../../actions/modal_actions';
import { receiveCurrentTeam, resetCurrentTeam } from '../../actions/current_team_actions';
import { selectAllTeams } from '../../reducers/selectors';
import { fetchUsers, removeAllUsers, deleteUser } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';

class DeleteTeamMembershipForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // e.preventDefault(); // remember: preventDefault would stop the Link from routing to '/home'
        const { currentTeam, currentUserId, teams, deleteTeamMembership, closeModal, receiveCurrentTeam, fetchUsers, logout, deleteUser, resetCurrentTeam, removeAllUsers } = this.props;

        if (teams.length === 1) {
            // Deactivate account
            // This will delete the user and any associated team memberships.
            // (Due to a dependent-destroy relationship defined on the User model.)
            closeModal();
            logout().then(() => {
                deleteUser(currentUserId);
                resetCurrentTeam();
                removeAllUsers();
            });
        } else {
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
    }

    render() {
        const { closeModal, currentTeam, teams, currentUser } = this.props;

        let header1Message = "Remove Yourself from the Workspace?";
        let header2Message = `If you remove yourself, you won't be able to access any of the projects or tasks in ${currentTeam.name}. 
                    If you want to regain access, you'll need to ask a coworker to invite you to the workspace again.`;
        
        let header1Class = "";
        
        let deleteButton = (
            <Link to="/home" onClick={this.handleClick}
                className="delete-project-button delete-team-membership-button" >Remove Me
                </Link>
        );

        if (teams.length === 1) {
            if (currentUser.primaryEmail === "demo@shavasana.com") {
                header2Message = "Sorry, you cannot delete the last workspace from the demo user account.";
                deleteButton = null;
            } else {
                header1Message = "Remove Yourself from the Workspace and Deactivate Account?";
                header2Message = `If you remove yourself, you won't be able to access any of the projects or tasks in ${currentTeam.name}. 
                        Your account will also be deactivated since this is your last domain.`;
                header1Class = "two-line-header";
            }
        }

        return (
            <div className={`delete-project-container delete-team-membership-container ${header1Class}`}>
                <button className="delete-project-close-btn delete-team-membership-close-btn" onClick={closeModal}>
                    {/* <img src={window.closeButtonHover} alt="x" /> */}
                    <i className="fas fa-times"></i>
                </button>

                {/* <h1>Remove Yourself from the Workspace?</h1>
                <h2>If you remove yourself, you won't be able to access any of the projects or tasks in {currentTeam.name}. 
                    If you want to regain access, you'll need to ask a coworker to invite you to the workspace again.</h2> */}
                <h1>{header1Message}</h1>
                <h2>{header2Message}</h2>
                <button className="cancel-delete-project cancel-delete-team-membership" onClick={closeModal}>Cancel</button>
                {/* <Link to="/home" onClick={this.handleClick}
                    className="delete-project-button delete-team-membership-button" >Remove Me
                </Link> */}
                {deleteButton}

            </div>
        );
    }
}

const msp = (state) => {
    const teams = selectAllTeams(state);
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    const currentTeam = state.ui.currentTeam;
    return ({ currentUserId, currentUser, currentTeam, teams });
};

const mdp = dispatch => {
    return {
        deleteTeamMembership: id => dispatch(deleteTeamMembership(id)),
        closeModal: () => dispatch(closeModal()),
        receiveCurrentTeam: team => dispatch(receiveCurrentTeam(team)),
        fetchUsers: teamId => dispatch(fetchUsers(teamId)),
        deleteUser: (id) => dispatch(deleteUser(id)),
        logout: () => dispatch(logout()),
        resetCurrentTeam: () => dispatch(resetCurrentTeam()),
        removeAllUsers: () => dispatch(removeAllUsers()),
    };
}

export default connect(msp, mdp)(DeleteTeamMembershipForm);
// export default withRouter(connect(msp, mdp)(DeleteTeamMembershipForm));