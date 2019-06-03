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
        const { projects, receiveNavHeader } = this.props;
        const projectItems = projects.map( project => { 
            return <ProjectIndexItem project={project} key={project.id} receiveNavHeader={receiveNavHeader} />;
        });

        return (
            <div className="project-index-container">
                <ul>{projectItems}</ul>
            </div>
        );
    }
}

export default ProjectIndex;