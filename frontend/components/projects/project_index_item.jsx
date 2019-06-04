import React from 'react';
import { Link } from 'react-router-dom';

export const ProjectIndexItem = props => {

    const handleClick = e => {
        // e.preventDefault(); // we don't want to prevent default here b/c that will prevent rendering the show page!!!
        const { receiveNavHeader, project, receiveMainContent } = props;
        receiveNavHeader(project.name);
        receiveMainContent("projectShow");
    }

    const { project } = props;
    return (
        <Link to={`/projects/${project.id}`} 
                className="project-index-item-container"
                onClick={handleClick}>
            <div className="project-index-item-tile"></div>
            {project.name}
        </Link>
    );
};