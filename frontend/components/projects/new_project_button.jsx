import React from 'react';
import { Link } from 'react-router-dom';

export const NewProjectButton = () => {

    return (
        <Link to="/projects/new" className="project-index-item-container new-project-btn-container">
            <div className="project-index-item-tile new-project-tile"><i className="fas fa-plus"></i></div>
            <p>New Project</p>
        </Link>
    );
};