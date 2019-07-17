import React from 'react';
import { Link } from 'react-router-dom';

export const NewProjectButton = props => {

    const sizeClass = props.size === "small" ? 'small-tile' : '';

    return (
        <Link to="/projects/new" className={`project-index-item-container new-project-btn-container ${sizeClass}`}>
            <div className={`project-index-item-tile new-project-tile ${sizeClass}`}><i className="fas fa-plus"></i></div>
            <p>New Project</p>
        </Link>
    );
};