import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { updateTask } from '../../actions/task_actions';
import AvatarToken from '../avatars/avatar_token';
import * as TimeHelperUtil from '../../util/time_ago_format_helper';

class SectionIndexItem extends React.Component {

    constructor(props) {
        super(props);
        
        this.toggleComplete = this.toggleComplete.bind(this);
    }

    toggleComplete(e) {
        const { task, updateTask } = this.props;
        const { id, completed } = task;
        const completedAt = completed ? null : new Date();
        updateTask({ id, completed: !completed, completedAt });
    }

    render() {
        const { task, handleOpenTaskShowClick, taskId, users, showProject, showDate, showAssignee } = this.props;

        const completedClass = task.completed ? "completed" : "";

        const selectedClass = task.id.toString() === taskId.toString() ? "selected" : "";
        
        let dueDate = null;
        if (task.dueOn) {
            // const date =`${TimeHelperUtil.MONTHS[new Date(task.dueOn).getMonth()]} ${new Date(task.dueOn).getDate()}`
            const date = TimeHelperUtil.formatRelativeDate(new Date(task.dueOn));

            const today = new Date();
            const timeDiff = Date.parse(task.dueOn) - Date.parse(today);

            let dateClass = "";

            if (completedClass) {   // completedClass is falsy (empty string) unless a task is completed
                dateClass = completedClass;
            } else if (date === "Today") {
                dateClass = "today";
            } else if (timeDiff < 0 || date === "Yesterday") {
                dateClass = "past";
            } else {
                dateClass = "future";
            }

            dueDate = <p className={`section-index-item-due-date ${dateClass}`}>{date}</p>;
        }
        
        const assignee = users[task.assigneeId];
        const assigneeToken = assignee ? <AvatarToken user={assignee} size="small" pointer="pointer"/> : null;

        return (
            <Link to={`/home/projects/${task.projectId}/${task.id}`}      // '/home/projects/:projectId/:taskId'
                className={`section-index-item-container ${selectedClass}`}
                onClick={handleOpenTaskShowClick}
                id={task.id} >
                <div className="section-index-item-left">
                    <div className={`check-task-circle ${completedClass}`}
                        onClick={this.toggleComplete}>
                        <i className="fas fa-check task-item"></i>
                    </div>
                    <p className={`task-item-name ${completedClass}`}>{task.name}</p>
                </div>

                <div className="section-index-item-right">
                    {/* INCLUDE PROJECT INFO HERE, if showProject is true */}
                    {showDate ? dueDate : null}
                    {showAssignee ? assigneeToken : null}
                </div>
            </Link>
        );
    }
}

const msp = (state, ownProps) => {
    // task is being handed down by the Section component
    const pathParts = ownProps.location.pathname.split("/");
    const taskId = pathParts[pathParts.length - 1];
    const { users } = state.entities;
    return { taskId, users };
};

const mdp = dispatch => {
    return {
        updateTask: task => dispatch(updateTask(task)),
    };
};

export default withRouter(connect(msp, mdp)(SectionIndexItem));