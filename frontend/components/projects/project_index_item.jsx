import React from 'react';
import { Link } from 'react-router-dom';

export const ProjectIndexItem = props => {

    // const handleClick = e => {
    //     // e.preventDefault(); // we don't want to prevent default here b/c that will prevent rendering the show page!!!
    //     const { receiveNavHeader, project, receiveMainContent } = props;
    //     receiveNavHeader(project.name);
    //     receiveMainContent("projectShow");
    // }

    const { project } = props;
    let layoutIcon;
    if (project.layout === "list") {
        layoutIcon = <i className="fas fa-list"></i>;
    } else if (project.layout === "board") {
        layoutIcon = <i className="fab fa-trello"></i>
    } else {
        layoutIcon = null;
    }
    
    return (
        <Link to={`/home/projects/${project.id}`} 
                className="project-index-item-container">
            <div className="project-index-item-tile">{layoutIcon}</div>
            <p>{project.name}</p>
        </Link>
    );
};