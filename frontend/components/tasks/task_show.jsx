import React from 'react';
// import { closeModal } from '../../actions/modal_actions';
import { Link } from 'react-router-dom';


class TaskShow extends React.Component {
    constructor(props) {
        super(props);

        const { task, sections, projects, users } = this.props;
        const { id, name, description, projectId,
            sectionId, assigneeId, dueOn,
            completed, completedAt,
            createdAt, updatedAt } = task;
        const section = sections[sectionId];
        const project = projects[projectId];
        const assignee = users[assigneeId];

        this.state = { id, name, description, project, 
            section, assignee, dueOn, completed, 
            completedAt, createdAt, updatedAt, projectId
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
    }    

    componentDidMount() {
        // debugger
        // fetchTask(this.props.match.params.taskId);
        const { fetchTask, task, taskId } = this.props;
        fetchTask(task.id);
    }

    componentDidUpdate(prevProps) {
        // debugger
        // if (this.state.id !== this.props.task.id) {
        //     this.setState({ ...this.props.task });
        // }
        if (this.state.id !== prevProps.task.id) {
            this.setState({ ...this.props.task });
        }
        // if (this.state.id !== this.props.taskIid) {
        //     this.setState({ ...this.props.task });
        // }
    }

    handleSubmit(e) {
        // debugger
        e.preventDefault();
        const { updateTask } = this.props;
        const task = this.state;
        updateTask(task);
        // createProject(project).then(payload => {
        //     const { project } = payload;
        //     const path = `/home/projects/${project.id}`;
        //     this.props.history.push(path);
        // });
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    toggleComplete(e) {
        const { updateTask, fetchTask } = this.props;
        const { id, completed } = this.state;
        const completedAt = new Date();
        const that = this;
        updateTask({ id, completed: !completed, completedAt }).then(payload => {
            fetchTask(id);
            that.setState({ completed: !completed, completedAt });
        });
    }

    handleDeleteTask(e) {
        e.preventDefault();
        const { deleteTask } = this.props;
        deleteTask(this.state.id);
    }


    render() {

        const { id, name, description, project,
            section, assignee, dueOn,
            completed, completedAt,
            createdAt, updatedAt } = this.state;

        let initials = assignee.primaryEmail.slice(0, 2).toUpperCase(); // use full name later

        // Calculation of time since task creation --> factor out into helper files later?
        const currentDateTime = new Date();
        let timeSinceCreation = Date.parse(currentDateTime) - Date.parse(createdAt);
        const timeAgoSinceCreation = timeAgoFormatted(timeSinceCreation);

        // Calculation of time since latest task update
        let timeSinceUpdate = Date.parse(currentDateTime) - Date.parse(updatedAt);
        const timeAgoSinceUpdate = timeAgoFormatted(timeSinceUpdate);

        // Task completion status
        let taskStatusMessage;
        if (completed) {
            // add checkmark icon inside taskStatusMessage
            let timeSinceCompletion = Date.parse(currentDateTime) - Date.parse(completedAt);
            const timeAgoSinceCompletion = timeAgoFormatted(timeSinceCompletion);
            taskStatusMessage = <div>{assignee.primaryEmail} completed this task.  {timeAgoSinceCompletion}</div>
        } else {
            taskStatusMessage = null;
        }


        return (
            <div className="task-show-container">
                <form className="task-show-form" onSubmit={this.handleSubmit}>
                    <h1 className="task-show-header">
                        <button className="mark-complete-btn" onClick={this.toggleComplete} type="button">
                            <i className="fas fa-check" id="fas-fa-check-task-button"></i>
                            Mark Complete
                        </button>
                        <input className="random-buttons" type="submit" value="Submit"/>
                        {/* <button onClick={this.handleDeleteTask}>Delete task</button> */}


                        <Link to={`/home/projects/${this.state.projectId}`}
                            // className="section-index-item-container"
                            className="random-buttons"
                            onClick={this.handleDeleteTask}
                            id={this.state.id} task={this.state} > Delete task
                        </Link>

                        <button className="task-show-close-btn" >
                            <img src={window.closeButtonHover} alt="x" />
                        </button>
                    </h1>
                    <div className="task-show-form-content">
                        <section className="task-show-section1">
                            <input type="text" value={name}
                                onChange={this.handleChange("name")} 
                                className="task-show-name-input" />
                            <div className="task-show-section1-bottom">
                                <div className="task-show-assign-button">
                                    <div className="avatar-task-show-large">{initials}</div>
                                    <div>
                                        <p className="task-show-assign-text1">Assigned to</p>
                                        <p className="task-show-assign-text2">{assignee.primaryEmail}</p>
                                    </div>
                                </div>
                                <div className="task-show-due-date-button">
                                    <div className="task-show-calendar-icon">
                                        <i className="far fa-calendar"></i>
                                    </div>
                                    <p>Due Date</p>
                                </div>
                            </div>
                        </section>
                        <section className="task-show-section2">
                            <div className="task-show-section2-top">
                                <i className="fas fa-align-left"></i>
                                <textarea className="task-show-description-input"
                                    value={description}
                                    onChange={this.handleChange("description")}>
                                </textarea>
                            </div>
                            <div className="task-show-section2-bottom">
                                <i className="far fa-clipboard"></i>
                                <div className="task-show-project-icon">{project.name}</div>
                                <div className="task-show-section-label">{section.name}</div>
                            </div>
                        </section>
                        <section className="task-show-section3">
                            <div className="task-show-section3-center">
                                <p>{assignee.primaryEmail} created this task.    {timeAgoSinceCreation}</p>
                                <p>{assignee.primaryEmail} updated this task.    {timeAgoSinceUpdate}</p>
                                {taskStatusMessage}
                            </div>
                        </section>
                    </div>
                    <div className="task-show-form-footer"></div>
                </form>
            </div>
        );
    }
}

export default TaskShow;



// helper function
function timeAgoFormatted(timeDiffInMS) {
    if (timeDiffInMS > 86400000) {          // format in days
        let timeDiffInDays = timeDiffInMS / 86400000;
        let days = Math.floor(timeDiffInDays) === 1 ? 'day' : 'days';
        return `${Math.floor(timeDiffInDays)} ${days} ago`;
    } else if (timeDiffInMS > 3600000) {    // format in hours
        let timeDiffInHours = timeDiffInMS / 3600000;
        let hours = Math.floor(timeDiffInHours) === 1 ? 'hour' : 'hours';
        return `${Math.floor(timeDiffInHours)} ${hours} ago`;
    } else if (timeDiffInMS > 60000) {      // format in minutes
        let timeDiffInMinutes = timeDiffInMS / 60000;
        let minutes = Math.floor(timeDiffInMinutes) === 1 ? 'minute' : 'minutes';
        return `${Math.floor(timeDiffInMinutes)} ${minutes} ago`;
    } else {
        return 'Just now';
    }
}