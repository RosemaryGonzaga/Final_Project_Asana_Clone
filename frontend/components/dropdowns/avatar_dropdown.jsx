import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { receiveCurrentTeam, resetCurrentTeam } from '../../actions/current_team_actions';
import { selectAllTeams } from '../../reducers/selectors';
import { fetchTeams } from '../../actions/team_actions';


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
        const { closeAvatarDropdown, logout, resetCurrentTeam } = this.props;
        e.preventDefault();
        closeAvatarDropdown(e);
        logout().then(() => resetCurrentTeam());
    };

    handleChangeTeamClick(team) {
        return e => {
            const { receiveCurrentTeam, closeAvatarDropdown } = this.props;
            closeAvatarDropdown(e);
            receiveCurrentTeam(team);
        };
    }

   
    render () {
        const { closeAvatarDropdown, currentTeam, teams } = this.props;
        // const { closeAvatarDropdown, currentTeam } = this.props;
        // const { teams } = this.state;

        // Sub component: another (mini) dropdown
        const moreOptionsDropdown = <div className="more-options-dropdown-menu-hidden" id="more-options-dropdown-menu">
            <div>Create New Workspace</div>
            <div>Remove me from this Workspace</div>
        </div>;

        // List of user's teams
        let userTeams = null;
        if (teams && currentTeam) {
            userTeams = teams.map(team => {
                const checkClass = team.id.toString() === currentTeam.id.toString() ? "fa-check-visible" : "fa-check-transparent";
                return (
                    // <div onClick={this.handleChangeTeamClick(team)}>
                    //     <a href="http://localhost:3000/#/home">link</a>
                    //     {/* <a href="https://shavasana.herokuapp.com/#/home">link</a> */}
                    //     {/* <a href="https://shavasana.herokuapp.com/#/home" target="_blank">link</a> */}
                    //     <i className={`fas fa-check ${checkClass}`}></i>
                    //     {team.name}
                    // </div>

                    // <a href="http://localhost:3000/#/home" onClick={this.handleChangeTeamClick(team)}>
                    //     {/* <a href="http://localhost:3000/#/home">link</a> */}
                    //     {/* <a href="https://shavasana.herokuapp.com/#/home">link</a> */}
                    //     {/* <a href="https://shavasana.herokuapp.com/#/home" target="_blank">link</a> */}
                    //     <i className={`fas fa-check ${checkClass}`}></i>
                    //     {team.name}
                    // </a>
                    
                    <div onClick={this.handleChangeTeamClick(team)}>
                        <a href="http://localhost:3000/#/home">
                        {/* <a href="https://shavasana.herokuapp.com/#/home"> */}
                        {/* <a href="https://shavasana.herokuapp.com/#/home" target="_blank"> */}
                            <i className={`fas fa-check ${checkClass}`}></i>
                            {team.name}
                        </a>
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
                    <div onClick={closeAvatarDropdown}><i className="fas fa-check fa-check-transparent"></i>Workspace Settings...</div>
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
                    <div onClick={closeAvatarDropdown}><i className="fas fa-check fa-check-transparent"></i>My Profile Settings...</div>
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
        // fetchTeams: () => dispatch(fetchTeams()),
    });
};

export default connect(msp, mdp)(AvatarDropdown);