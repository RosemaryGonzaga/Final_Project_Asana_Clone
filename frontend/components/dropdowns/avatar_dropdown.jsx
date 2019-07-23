import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { receiveCurrentTeam, resetCurrentTeam } from '../../actions/current_team_actions';
import { selectAllTeams } from '../../reducers/selectors';
import { fetchUsers, removeAllUsers } from '../../actions/user_actions';
// import { fetchTeams } from '../../actions/team_actions';
import { openModal } from '../../actions/modal_actions';


class AvatarDropdown extends React.Component {
    constructor(props) {
        super(props);
        // // const { teams, currentTeam } = this.props;
        // this.state = {
        //     teams: null,
        //     // currentTeam: null,
        // };

        this.displayMoreOptionsDropdown = this.displayMoreOptionsDropdown.bind(this);
        this.hideMoreOptionsDropdown = this.hideMoreOptionsDropdown.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleChangeTeamClick = this.handleChangeTeamClick.bind(this);
        this.openWorkspaceModal = this.openWorkspaceModal.bind(this);
        this.openProfileModal = this.openProfileModal.bind(this);
    }
    
    // // Actually, this lifecycle method isn't necessary...
    // // The reason teams was empty before was because I was passing in "null" instead of 
    // // the msp function i had defined when connecting the presentational component to Redux state
    // componentDidMount() {
    //     const { teams } = this.state;
    //     const { fetchTeams, receiveCurrentTeam, currentTeam } = this.props;
    //     if (!teams) {
    //         fetchTeams().then(payload => {
    //             this.setState({ teams: Object.values(payload.teams) })
    //         });
    //     }
    // }


    // Event handlers
    displayMoreOptionsDropdown() {
        const avatarDropdown = document.getElementById("more-options-dropdown-menu")
        avatarDropdown.className = "more-options-dropdown-menu";
    };

    hideMoreOptionsDropdown() {
        const avatarDropdown = document.getElementById("more-options-dropdown-menu")
        avatarDropdown.className = "more-options-dropdown-menu-hidden";
    };

    handleLogoutClick(e) {
        const { closeAvatarDropdown, logout, resetCurrentTeam, removeAllUsers } = this.props;
        e.preventDefault();
        closeAvatarDropdown(e);
        logout().then(() => {
            resetCurrentTeam();
            removeAllUsers();
        });
    };

    handleChangeTeamClick(team) {
        return e => {
            const { receiveCurrentTeam, closeAvatarDropdown, fetchUsers } = this.props;
            closeAvatarDropdown(e);
            receiveCurrentTeam(team);
            fetchUsers(team.id);
        };
    }

    openWorkspaceModal(e) {
        const { closeAvatarDropdown, openModal } = this.props;
        closeAvatarDropdown(e);
        openModal('editTeamGeneralSettings');
        // openModal('editTeamMemberSettings');
    }

    openProfileModal(e) {
        const { closeAvatarDropdown, openModal } = this.props;
        closeAvatarDropdown(e);
        openModal('openProfileSettings');
    }

   
    render () {
        const { closeAvatarDropdown, currentTeam, teams, openModal } = this.props;
        // const { closeAvatarDropdown, currentTeam } = this.props;
        // const { teams } = this.state;

        // Sub component: another (mini) dropdown
        const moreOptionsDropdown = <div className="more-options-dropdown-menu-hidden" id="more-options-dropdown-menu">
            <div onClick={() => openModal('createTeam')}>Create New Workspace</div>
            <div onClick={() => openModal('removeUserFromTeam')}>Remove me from this Workspace</div>
        </div>;

        // List of user's teams
        let userTeams = null;
        if (teams && currentTeam) {
            userTeams = teams.map(team => {
                const checkClass = team.id.toString() === currentTeam.id.toString() ? "fa-check-visible" : "fa-check-transparent";
                return (
                    // NOTE: Can't use target="_blank" with Link component(?)
                    // Need to use a tag... but in that case, href should specify full url (e.g., https://shavasana.herokuapp.com/#/home)
                    <div key={team.id} onClick={this.handleChangeTeamClick(team)}>
                        <Link to="/home">
                            <i className={`fas fa-check ${checkClass}`}></i>
                            {team.name}
                        </Link>
                    </div>
                );
            });
        }

        return (
            <div className="avatar-dropdown-menu-hidden" id="avatar-dropdown-menu">
                <section>
                    {userTeams}
                </section>
                <section>
                    {/* <div onClick={closeAvatarDropdown}><i className="fas fa-check fa-check-transparent"></i>Workspace Settings...</div> */}
                    <div onClick={this.openWorkspaceModal}><i className="fas fa-check fa-check-transparent"></i>Workspace Settings...</div>
                    <div className="more-options-dropdown-parent"
                        onClick={closeAvatarDropdown}
                        onMouseEnter={this.displayMoreOptionsDropdown}
                        onMouseLeave={this.hideMoreOptionsDropdown}>
                        <i className="fas fa-check fa-check-transparent"></i>
                        More
                        {moreOptionsDropdown}
                    </div>
                </section>
                <section>
                    {/* <div onClick={closeAvatarDropdown}><i className="fas fa-check fa-check-transparent"></i>My Profile Settings...</div> */}
                    <div onClick={this.openProfileModal}><i className="fas fa-check fa-check-transparent"></i>My Profile Settings...</div>
                    <div onClick={this.handleLogoutClick}><i className="fas fa-check fa-check-transparent"></i>Log Out</div>
                </section>
            </div>
        );
    }
}



const msp = state => {
    const teams = selectAllTeams(state);
    const currentTeam = state.ui.currentTeam;
    return { teams, currentTeam };
}

const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        resetCurrentTeam: team => dispatch(resetCurrentTeam(team)),
        receiveCurrentTeam: team => dispatch(receiveCurrentTeam(team)),
        openModal: modal => dispatch(openModal(modal)),
        fetchUsers: teamId => dispatch(fetchUsers(teamId)),
        removeAllUsers: () => dispatch(removeAllUsers()),
        // clearAllUsers: () => dispatch(clearAllUsers()),
        // fetchTeams: () => dispatch(fetchTeams()),
    });
};

export default connect(msp, mdp)(AvatarDropdown);