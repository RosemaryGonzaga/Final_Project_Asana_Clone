import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { receiveCurrentTeam, resetCurrentTeam } from '../../actions/current_team_actions';
import { selectAllTeams } from '../../reducers/selectors';
import { fetchTeams } from '../../actions/team_actions';


class AvatarDropdown extends React.Component {
    constructor(props) {
        super(props);
        // const { teams, currentTeam } = this.props;
        this.state = {
            teams: null,
            // currentTeam: null,
        };

        this.displayMoreOptionsDropdown = this.displayMoreOptionsDropdown.bind(this);
        this.hideMoreOptionsDropdown = this.hideMoreOptionsDropdown.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    
    componentDidMount() {
        const { teams } = this.state;
        const { fetchTeams } = this.props;
        if (!teams) {
            fetchTeams().then(payload => {
                this.setState({ teams: Object.values(payload.teams) })
            });
        }
    }


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
        const { closeAvatarDropdown, logout, resetCurrentTeam } = this.props;
        e.preventDefault();
        closeAvatarDropdown(e);
        logout().then(() => resetCurrentTeam());
    };

   
    render () {
        const { closeAvatarDropdown } = this.props;
        const { teams } = this.state;

        // Sub component: another (mini) dropdown
        const moreOptionsDropdown = <div className="more-options-dropdown-menu-hidden" id="more-options-dropdown-menu">
            <div>Create New Workspace</div>
            <div>Remove me from this Workspace</div>
        </div>;

        // List of user's teams
        let userTeams = null;
        if (teams) {
            userTeams = teams.map(team => <div onClick={closeAvatarDropdown}>{team.name}</div>);
        }

        return (
            <div className="avatar-dropdown-menu-hidden" id="avatar-dropdown-menu">
                <section>
                    {userTeams}
                </section>
                <section>
                    <div onClick={closeAvatarDropdown}>Workspace Settings...</div>
                    <div className="more-options-dropdown-parent"
                        onClick={closeAvatarDropdown}
                        onMouseEnter={this.displayMoreOptionsDropdown}
                        onMouseLeave={this.hideMoreOptionsDropdown}>
                        More
                        {moreOptionsDropdown}
                    </div>
                </section>
                <section>
                    <div onClick={closeAvatarDropdown}>My Profile Settings...</div>
                    <div onClick={this.handleLogoutClick}>Log Out</div>
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
        receiveCurrentTeam: team => dispatch(receiveCurrentTeam(team)),
        resetCurrentTeam: team => dispatch(resetCurrentTeam(team)),
        fetchTeams: () => dispatch(fetchTeams()),
    });
};

export default connect(null, mdp)(AvatarDropdown);