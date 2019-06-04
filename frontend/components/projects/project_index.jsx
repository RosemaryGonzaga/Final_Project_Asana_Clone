import React from 'react';
import { ProjectIndexItem } from './project_index_item';
import ProjectShowContainer from './project_show_container';
import { Route } from 'react-router-dom';

class ProjectIndex extends React.Component {
    componentDidMount() {
        const { fetchProjects } = this.props;
        fetchProjects();
    }

    render() {
        const { projects, receiveNavHeader, receiveMainContent } = this.props;
        const projectItems = projects.map( project => { 
            return <ProjectIndexItem project={project} key={project.id} receiveNavHeader={receiveNavHeader} receiveMainContent={receiveMainContent} />;
        });

        return (
            <div className="project-index-container">
                <ul>{projectItems}</ul>
            </div>
        );
    }
}

export default ProjectIndex;