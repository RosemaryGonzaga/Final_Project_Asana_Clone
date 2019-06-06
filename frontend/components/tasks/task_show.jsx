import React from 'react';
// import { closeModal } from '../../actions/modal_actions';
// import { Link } from 'react-router-dom';

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
        this.state = {
            name,
            description,
            project,
            section,
            assignee,
            dueOn,
            completed,
            completedAt,
            createdAt,
            updatedAt
        };

        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    componentDidMount() {
        const { fetchTask } = this.props;
        fetchTask(this.props.match.params.taskId);
    }


    handleSubmit(e) {
        // e.preventDefault();
        // const { createProject } = this.props;
        // const project = this.state;
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

    handleMarkComplete(e) {

    }

    render() {

        // const { task, sections, projects, users } = this.props;
        // const { id, name, description, projectId, 
        //         sectionId, assigneeId, dueOn, 
        //         completed, completedAt, 
        //         createdAt, updatedAt } = task;
        // const section = sections[sectionId];
        // const project = projects[projectId];
        // const assignee = users[assigneeId];

        const { id, name, description, project,
            section, assignee, dueOn,
            completed, completedAt,
            createdAt, updatedAt } = this.state;


        // Calculation of time since task creation --> factor out into helper files later?
        const currentDateTime = new Date();
        let timeSinceCreation = Date.parse(currentDateTime) - Date.parse(createdAt);
        let timeAgoSinceCreation;
        if (timeSinceCreation > 86400000) {          // format in days
            timeSinceCreation /= 86400000;
            timeAgoSinceCreation = `${Math.floor(timeSinceCreation)} days ago`;
        } else if (timeSinceCreation > 3600000) {    // format in hours
            timeSinceCreation /= 3600000;
            timeAgoSinceCreation = `${Math.floor(timeSinceCreation)} hours ago`;
        } else if (timeSinceCreation > 60000) {      // format in minutes
            timeSinceCreation /= 60000;
            timeAgoSinceCreation = `${Math.floor(timeSinceCreation)} minutes ago`;
        } else {
            timeAgoSinceCreation = 'just now'
        }


        // Calculation of time since latest task update
        let timeSinceUpdate = Date.parse(currentDateTime) - Date.parse(updatedAt);
        let timeAgoSinceUpdate;
        if (timeSinceUpdate > 86400000) {          // format in days
            timeSinceUpdate /= 86400000;
            timeAgoSinceUpdate = `${Math.floor(timeSinceUpdate)} days ago`;
        } else if (timeSinceUpdate > 3600000) {    // format in hours
            timeSinceUpdate /= 3600000;
            timeAgoSinceUpdate = `${Math.floor(timeSinceUpdate)} hours ago`;
        } else if (timeSinceUpdate > 60000) {      // format in minutes
            timeSinceUpdate /= 60000;
            timeAgoSinceUpdate = `${Math.floor(timeSinceUpdate)} minutes ago`;
        } else {
            timeAgoSinceUpdate = 'just now'
        }


        // Task completion status
        let taskStatusMessage;
        if (completed) {
            // add checkmark icon inside taskStatusMessage
            taskStatusMessage = <div>{assignee.primaryEmail} completed this task.</div>
        } else {
            taskStatusMessage = null;
            // taskStatusMessage = <div>{assignee.primaryEmail} has NOT yet completed this task.</div>
        }


        return (
            <div className="task-show-container">
                <form className="task-show-form" onSubmit={this.handleSubmit}>
                    <h1 className="task-show-header">
                        <button>Mark Complete</button>
                        <button className="task-show-close-btn" >
                            <img src={window.closeButtonHover} alt="x" />
                        </button>
                    </h1>
                    <div className="task-show-form-content">
                        <section className="task-show-section1">
                            <input type="text" value={name} id="12345"
                                onChange={this.handleChange("name")} />
                            <p>{assignee.primaryEmail}</p>
                            <p>Due: {dueOn}</p>
                        </section>
                        <section className="task-show-section2">
                            <textarea id="editDescription-task"
                                        value={description}
                                        onChange={this.handleChange("description")}>
                            </textarea>
                            <p>{project.name}</p>
                            <p>{section.name}</p>
                        </section>
                        <section className="task-show-section3">section 3
                            <p>{assignee.primaryEmail} created this task.    {timeAgoSinceCreation}</p>
                            <p>{assignee.primaryEmail} updated this task.    {timeAgoSinceUpdate}</p>
                            {taskStatusMessage}
                            {/* <div>THIS IS A TEST: {this.state.completed.toString()}</div> */}
                        </section>
                    </div>
                    <div className="task-show-form-footer"></div>
                </form>
            </div>
        );
    }
}

export default TaskShow;


