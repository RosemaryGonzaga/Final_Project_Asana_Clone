import React from 'react';
import { ProjectIndexItem } from './project_index_item';
import { NewProjectButton } from './new_project_button';
// import ProjectShowContainer from './project_show_container';
// import { Route } from 'react-router-dom';

class ProjectIndex extends React.Component {
    componentDidMount() {
        const { fetchProjects } = this.props;
        fetchProjects();
    }

    render() {
        const { projects, currentTeam } = this.props;
        // const { projects, receiveNavHeader, receiveMainContent, currentTeam } = this.props;
        // debugger
        // NOTE: THIS COMPONENT RENDERS BEFORE HOME COMPONENT MOUNTS
        // As of 7/4, teams and currentTeam are only fetched when home component mounts
        // The first time ProjectIndex renders, currentTeam will be null
        let teamProjects = projects.slice();
        let projectItems = null;
        if (currentTeam) {  // only access currentTeam's id if currentTeam is truthy
            teamProjects = projects.filter(project => project.teamId === currentTeam.id);
            projectItems = teamProjects.map(project => {
                return <ProjectIndexItem project={project} key={project.id} />;
                // return <ProjectIndexItem project={project} key={project.id} receiveNavHeader={receiveNavHeader} receiveMainContent={receiveMainContent} />;
            });
            const newProjectTile = <NewProjectButton key="newProjBtn" />;
            projectItems.push(newProjectTile); // add new project button here!
        }
        // // const teamProjects = projects.filter(project => project.teamId === currentTeam.id);  // this throws an error (currentTeam is undefined, hasn't been added to Redux store yet)
        // // let projectItems = teamProjects.map( project => { 
        // // OLD CODE THAT WORKED BEFORE FILTERING PROJECTS BY CURRENT TEAM:
        // let projectItems = projects.map( project => { 
        //     return <ProjectIndexItem project={project} key={project.id} receiveNavHeader={receiveNavHeader} receiveMainContent={receiveMainContent} />;
        // });

        // const newProjectTile = <NewProjectButton key="newProjBtn"/>;
        // projectItems.push(newProjectTile); // add new project button here!

        return (
            <div className="project-index-container">
                <ul>{projectItems}</ul>
            </div>
        );
    }
}

export default ProjectIndex;