import React from 'react';

export const ProjectIndexItem = props => {
    const { project } = props;
    console.log(project);
    return (
        <div className="project-index-item-container">
            <div className="project-index-item-tile"></div>
            <h1>{project.name}</h1>
        </div>
    );
};