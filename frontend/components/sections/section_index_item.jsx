import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateTask } from '../../actions/task_actions';

class SectionIndexItem extends React.Component {

    constructor(props) {
        super(props);
        this.toggleComplete = this.toggleComplete.bind(this);
    }

    toggleComplete(e) {
        const { task, updateTask } = this.props;
        const { id, completed } = task;
        const completedAt = completed ? null : new Date();
        updateTask({ id, completed: !completed, completedAt })
        // const that = this;
        // updateTask({ id, completed: !completed, completedAt }).then(payload => {
        //     fetchTask(id);
        // });
    }

    render() {
        const { task, handleOpenTaskShowClick } = this.props;

        const completedClass = task.completed ? "completed" : "";

        return (
            <Link to={`/home/projects/${task.projectId}/${task.id}`}      // '/home/projects/:projectId/:taskId'
                className="section-index-item-container"
                onClick={handleOpenTaskShowClick}
                id={task.id} >
                <div className={`check-task-circle ${completedClass}`}
                    onClick={this.toggleComplete}>
                    <i className="fas fa-check task-item"></i>
                </div>
                <p className={`task-item-name ${completedClass}`}>{task.name}</p>

                {/* <input type="text" value={task.name}
                    onChange={this.handleChange("name")}
                    className="task-show-name-input" /> */}
            </Link>
        );
    }
}

const mdp = dispatch => {
    return {
        updateTask: task => dispatch(updateTask(task)),
    };
};

export default connect(null, mdp)(SectionIndexItem);