import React from 'react';
import { Link } from 'react-router-dom';

export const ProjectIndexItem = props => {
    const { project } = props;
    return (
        <Link to={`/projects/${project.id}`} className="project-index-item-container">
            <div className="project-index-item-tile"></div>
            {project.name}
        </Link>
    );
};