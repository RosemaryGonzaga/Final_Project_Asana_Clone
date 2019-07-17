import React from 'react';
import { Link } from 'react-router-dom';

class TeamSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numProjectsDisplayed: 5,
        };
        this.showMoreProjects = this.showMoreProjects.bind(this);
    }

    showMoreProjects(num) {
        return e => {
            e.preventDefault();
            this.setState({ numProjectsDisplayed: num });
        }
    }

    render() {
        const { currentTeam, users, projects, teams, openModal } = this.props;
        const { numProjectsDisplayed } = this.state;
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
                teamMembers.push(<li className="team-sidebar-initials-placeholder" key={`blank${i}`} 
                                        onClick={() => openModal('editTeamMemberSettings')}></li>)
                i++;
            }
            teamMembers.push(<li className="team-sidebar-initials-invite-ppl" key="invite-ppl" 
                                    onClick={() => openModal('editTeamMemberSettings')}>Invite People</li>)
        }

        teamMembers = teamMembers.slice(0, 7);    // only show first 7 team members --> NEED TO TEST THIS LATER

        let teamProjects = projects.slice();
        let projectItems = null;
        if (currentTeam) {  // only access currentTeam's id if currentTeam is truthy
            teamProjects = projects.filter(project => project.teamId === currentTeam.id);
            projectItems = teamProjects.map(project => {
                return  (<Link to={`/home/projects/${project.id}`} className="team-sidebar-project-item" key={project.id}>
                            <div className="team-sidebar-project-bullet"></div>
                            <div>{project.name}</div>
                        </Link>);
                // return  <li className="team-sidebar-project-item" key={project.id}>
                //         <div className="team-sidebar-project-bullet"></div>
                //             <div>{project.name}</div>
                //         </li>
            });
            projectItems = projectItems.slice(0, numProjectsDisplayed);    // only show first 5 projects, initially
        }

        const showMoreProjectsButton = <div className="team-sidebar-show-more" 
                                        onClick={this.showMoreProjects(teamProjects.length)}>
                                        Show more projects</div>;

        // // TEMPORARY?
        // const userTeams = teams.map(team => <li>{team.name}</li>);

        return (
            <div className="team-sidebar-container">
                {/* <div className="team-sidebar-heading">
                    <h2>{currentTeam ? currentTeam.name : null}</h2>
                    <i className="fas fa-plus" onClick={() => openModal('editTeamMemberSettings')}></i>
                </div> */}
                <Link to="/home/team-overview" className="team-sidebar-heading">
                    <h2>{currentTeam ? currentTeam.name : null}</h2>
                    <i className="fas fa-plus" onClick={() => openModal('editTeamMemberSettings')}></i>
                </Link>
                <br /> {/* TEMP BREAK */}
                <ul className="team-sidebar-members">
                    {teamMembers}
                </ul>
                <br /> {/* TEMP BREAK */}
                <ul className="team-sidebar-projects">
                    {projectItems}
                </ul>
                <br /> {/* TEMP BREAK */}
                {teamProjects.length > 5 && numProjectsDisplayed === 5 ? showMoreProjectsButton : null}
                <br /> {/* TEMP BREAK */}
                {/* BELOW IS JUST FOR TESTING */}
                {/* <ul className="team-sidebar-teams">
                    <li>My teams:</li>
                    {userTeams}
                </ul> */}
            </div>
        );
    }
}

export default TeamSidebar;