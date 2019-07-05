import React from 'react';
import { ProjectIndexItem } from './project_index_item';
import { NewProjectButton } from './new_project_button';
import ProjectShowContainer from './project_show_container';
import { Route } from 'react-router-dom';

class ProjectIndex extends React.Component {
    componentDidMount() {
        const { fetchProjects } = this.props;
        fetchProjects();
        // THIS COMPONENT RENDERS BEFORE HOME COMPONENT MOUNTS
        // NEED TO FETCH TEAMS, CURRENT TEAM, USERS HERE?
        // RESUME WORK HERE!!!!! 

        
    }

    render() {
        const { projects, receiveNavHeader, receiveMainContent, currentTeam } = this.props;
        debugger
        let teamProjects = projects.slice();
        if (currentTeam) {  // only access currentTeam's id if currentTeam is truthy
            teamProjects = projects.filter(project => project.teamId === currentTeam.id);
        }
        // const teamProjects = projects.filter(project => project.teamId === currentTeam.id);  // this throws an error (currentTeam is undefined, hasn't been added to Redux store yet)
        // let projectItems = projects.map( project => { 
        let projectItems = teamProjects.map( project => { 
            return <ProjectIndexItem project={project} key={project.id} receiveNavHeader={receiveNavHeader} receiveMainContent={receiveMainContent} />;
        });

        const newProjectTile = <NewProjectButton key="newProjBtn"/>;
        projectItems.push(newProjectTile); // add new project button here!

        return (
            <div className="project-index-container">
                <ul>{projectItems}</ul>
            </div>
        );
    }
}

export default ProjectIndex;