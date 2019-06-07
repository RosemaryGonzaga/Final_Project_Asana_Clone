import React from 'react';
import TaskShowContainer from '../tasks/task_show_container';
import { Link } from 'react-router-dom';

export const SectionIndexItem = props => {

    // const { section } = props;
    // let layoutIcon;
    // if (section.layout === "list") {
    //     layoutIcon = <i className="fas fa-list"></i>;
    // } else if (section.layout === "board") {
    //     layoutIcon = <i className="fab fa-trello"></i>
    // } else {
    //     layoutIcon = null;
    // }

    const { task, handleOpenTaskShowClick } = props;
    // debugger
    return (
        <Link to={`/home/projects/${task.projectId}/${task.id}`}      // '/home/projects/:projectId/:taskId'
            className="section-index-item-container"
            onClick={handleOpenTaskShowClick}
            id={task.id} >
            <i className="far fa-check-circle" id="fa-check-circle-task-item"></i>
            <p>{task.name}</p>

            {/* <input type="text" value={task.name}
                onChange={this.handleChange("name")}
                className="task-show-name-input" /> */}
        </Link>
    );
};