import React from 'react';
import { timeAgoFormatted, MONTHS } from '../../util/time_ago_format_helper';
// import { Link } from 'react-router-dom';

export const TaskIndexItem = props => {

    // const { task, handleOpenTaskShowClick } = props;
    const { task, project } = props;
    // debugger
    let dueDate = "";
    if (task.dueOn) {
        dueDate = `${MONTHS[new Date(task.dueOn).getMonth()]} ${new Date(task.dueOn).getDate()}`
    }

    // debugger
    return (
        // <Link to={`/home/projects/${task.projectId}/${task.id}`}      // '/home/projects/:projectId/:taskId'
        //     className="section-index-item-container"
        //     onClick={handleOpenTaskShowClick}
        //     id={task.id} >
        //     <i className="far fa-check-circle" id="fa-check-circle-task-item"></i>
        //     <p>{task.name}</p>
        // </Link>
        <div className="task-index-item-container">
            <div className="task-index-item-left">
                <i className="far fa-check-circle" id="fa-check-circle-task-item"></i>
                <p>{task.name}</p>
            </div>

            <div className="task-index-item-right">
                <div className="task-show-project-icon">{project.name}</div>
                <div className="task-index-item-due-date">{dueDate}</div>
            </div>
        </div>
    );
};