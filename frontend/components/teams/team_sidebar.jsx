import React from 'react';

class TeamSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentTeam, users, projects, teams } = this.props;
        // NEED TO FILTER OUT USERS THAT ARE NOT PART OF THE CURRENT TEAM
        // Opt 1: filter here in this component?
        // Opt 2: modify fetchUsers / Users#index (controller) to only fetch current team's users instead of all users in DB?
        // Opt 3: write a parallel fetchUsers / Users#index to allow for both scenarios (will need to fetch all users when inviting new team members?)
        const teamMembers = users.map(user => {
            const initials = user.primaryEmail.slice(0, 2).toUpperCase(); 
            // return initials;
            return <li>{initials}</li>;
        });
        const teamProjects = projects.map(project => <li>{project.name}</li>);

        // TEMPORARY?
        const userTeams = teams.map(team => <li>{team.name}</li>);

        return (
            <div className="team-sidebar-container">
                <div className="team-sidebar-heading">
                    <h2>{currentTeam ? currentTeam.name : null}</h2>
                    <div>+</div>
                </div>
                <br /> {/* TEMP BREAK */}
                <ul className="team-sidebar-members">
                    <li>{currentTeam ? currentTeam.name : null} members:</li>
                    {teamMembers}
                </ul>
                <br /> {/* TEMP BREAK */}
                <ul className="team-sidebar-projects">
                    <li>{currentTeam ? currentTeam.name : null} projects:</li>
                    {teamProjects}
                </ul>
                <br /> {/* TEMP BREAK */}
                <div className="team-sidebar-show-more">Show more projects</div>
                <br /> {/* TEMP BREAK */}
                {/* BELOW IS JUST FOR TESTING */}
                <ul className="team-sidebar-teams">
                    <li>My teams:</li>
                    {userTeams}
                </ul>
            </div>
        );
    }
}

export default TeamSidebar;