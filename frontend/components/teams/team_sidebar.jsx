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
        // Implemented option 2
        let teamMembers = users.map(user => {
            const initials = user.primaryEmail.slice(0, 2).toUpperCase();
            return <li className="team-sidebar-initials avatar" key={user.id}>{initials}</li>;
        });

        if (teamMembers.length <= 3) {
            let i = 1;
            while (teamMembers.length < 3) {
                teamMembers.push(<li className="team-sidebar-initials-placeholder" key={`blank${i}`}></li>)
                i++;
            }
            teamMembers.push(<li className="team-sidebar-initials-invite-ppl" key="invite-ppl">Invite People</li>)
        }

        // teamMembers = teamMembers.slice(0, 7);    // only show first 7 team members 

        let teamProjects = projects.slice();
        let projectItems = null;
        if (currentTeam) {  // only access currentTeam's id if currentTeam is truthy
            teamProjects = projects.filter(project => project.teamId === currentTeam.id);
            projectItems = teamProjects.map(project => <li key={project.id}>{project.name}</li>);
        }

        // projectItems = projectItems.slice(0, 5);    // only show first 5 projects

        // TEMPORARY?
        const userTeams = teams.map(team => <li>{team.name}</li>);

        return (
            <div className="team-sidebar-container">
                <div className="team-sidebar-heading">
                    <h2>{currentTeam ? currentTeam.name : null}</h2>
                    <i className="fas fa-plus"></i>
                </div>
                <br /> {/* TEMP BREAK */}
                <ul className="team-sidebar-members">
                    {/* <li>{currentTeam ? currentTeam.name : null} members:</li> */}
                    {teamMembers}
                </ul>
                <br /> {/* TEMP BREAK */}
                <ul className="team-sidebar-projects">
                    <li>{currentTeam ? currentTeam.name : null} projects:</li>
                    {projectItems}
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