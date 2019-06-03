import React from 'react';
import { ProjectIndexItem } from './project_index_item';

class ProjectIndex extends React.Component {
    componentDidMount() {
        const { fetchProjects } = this.props;
        fetchProjects();
    }

    render() {
        const { projects } = this.props;
        const projectItems = projects.map( project => { 
            return <ProjectIndexItem project={project} key={project.id} />;
        });

        return (
            <div className="project-index-container">
                <ul>{projectItems}</ul>
            </div>
        );
    }
}

export default ProjectIndex;