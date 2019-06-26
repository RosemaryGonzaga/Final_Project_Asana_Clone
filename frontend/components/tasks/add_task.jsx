import React from 'react';
// import { timeAgoFormatted } from '../../util/time_ago_format_helper';
// import { closeModal } from '../../actions/modal_actions';
// import { Link } from 'react-router-dom';


class AddTask extends React.Component {
    constructor(props) {
        super(props);

        // debugger

        this.state = {
            name: "", 
            description: "", 
            projectId: this.props.project.id,
            project: this.props.project.name,        // need to dispatch project with the id
            sectionId: Object.keys(this.props.sections)[0],
            section: this.props.sections[Object.keys(this.props.sections)[0]].name,        // need to dispatch section with the id
            assigneeId: this.props.currentUserId,
            assignee: `${this.props.currentUser.primaryEmail}`,       // need to dispatch assignee (user with the id
            dueOn: "", 
            completed: "",
            completedAt: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    }

    // componentDidMount() {
    //     // debugger
    //     // fetchTask(this.props.match.params.taskId);
    //     const { fetchTask, task, taskId } = this.props;
    //     fetchTask(task.id);
    // }

    // componentDidUpdate(prevProps) {
    //     // debugger
    //     if (this.state.id !== this.props.task.id) {
    //         this.setState({ ...this.props.task });
    //     }
    // }

    handleSubmit(e) {
        e.preventDefault();
        const { createTask, displayTaskShow } = this.props;
        const task = this.state;
        createTask(task).then(payload => {
            displayTaskShow(payload.task.id);
            const path = `/home/projects/${payload.task.projectId}/${payload.task.id}`;
            this.props.history.push(path);
        });
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    toggleComplete(e) {
        const { createTask, fetchTask } = this.props;
        const { id, completed } = this.state;
        const completedAt = new Date();
        const that = this;
        createTask({ id, completed: !completed, completedAt }).then(payload => {
            fetchTask(id);
            that.setState({ completed: !completed, completedAt });
        });
    }


    render() {

        const { id, name, description, project,
            section, assignee, dueOn,
            completed, completedAt,
            createdAt, updatedAt } = this.state;

        // let initials = assignee.primaryEmail.slice(0, 2).toUpperCase(); // use full name later
        let initials = assignee.slice(0, 2).toUpperCase(); // use full name later


        return (
            <div className="task-show-container">
                <form className="task-show-form" onSubmit={this.handleSubmit}>
                    <h1 className="task-show-header">
                        <button className="mark-complete-btn" onClick={this.toggleComplete} type="button" disabled>
                            <i className="fas fa-check" id="fas-fa-check-task-button"></i>
                            Mark Complete
                        </button>
                        <input className="random-buttons" type="submit" value="Submit" />
                        <button className="random-buttons">Delete task</button>
                        <button className="task-show-close-btn" >
                            {/* <img src={window.closeButtonHover} alt="x" /> */}
                            <i className="fas fa-times"></i>
                        </button>
                    </h1>
                    <div className="task-show-form-content">
                        <section className="task-show-section1">
                            <input type="text" value={name}
                                onChange={this.handleChange("name")}
                                className="task-show-name-input" 
                                placeholder="Write a task name"/>
                            <div className="task-show-section1-bottom">
                                <div className="task-show-assign-button">
                                    <div className="avatar-task-show-large">{initials}</div>
                                    <div>
                                        <p className="task-show-assign-text1">Assigned to</p>
                                        <p className="task-show-assign-text2">{assignee}</p>
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
                                    onChange={this.handleChange("description")}
                                    placeholder="description">
                                </textarea>
                            </div>
                            <div className="task-show-section2-bottom">
                                <i className="far fa-clipboard"></i>
                                <div className="task-show-project-icon">{project}</div>
                                <div className="task-show-section-label">{section}</div>
                            </div>
                        </section>
                        <section className="task-show-section3">
                            <div className="task-show-section3-center">
                                <p>{assignee} created this task.    Just now</p>
                                <p>{assignee} updated this task.    Just now</p>
                                {/* {taskStatusMessage} */}
                            </div>
                        </section>
                    </div>
                    <div className="task-show-form-footer"></div>
                </form>
            </div>
        );
    }
}

export default AddTask;



// // helper function
// function timeAgoFormatted(timeDiffInMS) {
//     if (timeDiffInMS > 86400000) {          // format in days
//         let timeDiffInDays = timeDiffInMS / 86400000;
//         let days = Math.floor(timeDiffInDays) === 1 ? 'day' : 'days';
//         return `${Math.floor(timeDiffInDays)} ${days} ago`;
//     } else if (timeDiffInMS > 3600000) {    // format in hours
//         let timeDiffInHours = timeDiffInMS / 3600000;
//         let hours = Math.floor(timeDiffInHours) === 1 ? 'hour' : 'hours';
//         return `${Math.floor(timeDiffInHours)} ${hours} ago`;
//     } else if (timeDiffInMS > 60000) {      // format in minutes
//         let timeDiffInMinutes = timeDiffInMS / 60000;
//         let minutes = Math.floor(timeDiffInMinutes) === 1 ? 'minute' : 'minutes';
//         return `${Math.floor(timeDiffInMinutes)} ${minutes} ago`;
//     } else {
//         return 'Just now';
//     }
// }