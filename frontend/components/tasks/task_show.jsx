import React from 'react';
import { timeAgoFormatted, MONTHS } from '../../util/time_ago_format_helper';
// import { closeModal } from '../../actions/modal_actions';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { SectionListDropdown } from './section_list_dropdown';

// import "react-datepicker/dist/react-datepicker.css";
// import "node_modules/react-datepicker/dist/react-datepicker.css";   // node_modules/react-datepicker/dist/react-datepicker.css
// import "../../../node_modules/react-datepicker/dist/react-datepicker.css";   // node_modules/react-datepicker/dist/react-datepicker.css


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

        // Local state
        this.state = { 
            id, name, description, project, 
            section, assignee, dueOn, completed, 
            completedAt, createdAt, updatedAt, projectId,
            sectionId,
            dueDateButton: true,
        };

        // Bind event handlers
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectSection = this.selectSection.bind(this);

        // this.handleDueDateSelection = this.handleDueDateSelection.bind(this);
    }    



    componentDidMount() {
        // debugger
        // fetchTask(this.props.match.params.taskId);
        const { fetchTask, task, taskId } = this.props;
        fetchTask(task.id);
    }

    componentDidUpdate(prevProps) {
        // debugger
        // if (this.state.id !== prevProps.task.id) {
        //     this.setState({ ...this.props.task });
        // }
        if (this.state.id.toString() !== prevProps.taskId.toString()) {  // need to use taskId b/c task.id is undefined in prevProps if this component updates after deleting a task
            this.setState({ ...this.props.task });
        }
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
            if (e.target) {
                this.setState({ [field]: e.target.value });
            } else {
                this.setState({ [field]: e});   // added this for DatePicker (to set DueDate)
            }
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
        const { deleteTask, exitTaskShowUponTaskDeletion } = this.props;
        deleteTask(this.state.id);
        const path = `/home/projects/${this.state.projectId}`;
        this.props.history.push(path);
        exitTaskShowUponTaskDeletion();
    }

    toggleDatePicker() {
        const { dueOn, dueDateButton } = this.state
        let dueDate = dueOn;
        if (dueOn) {
            dueDate = `${MONTHS[new Date(dueOn).getMonth()]} ${new Date(dueOn).getDate()}`
        }

        if (dueDateButton) {
            return (
                <div className="task-show-due-date-button"
                    onClick={e => this.setState({ dueDateButton: false })}>
                    <div className="task-show-calendar-icon">
                        <i className="far fa-calendar"></i>
                    </div>
                    <div className="task-show-due-date-text">
                        <p>Due Date</p>
                        <p>{dueDate}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <DatePicker popperPlacement="bottom-start"
                    onChange={this.handleChange("dueOn")} 
                    onBlur={() => this.setState({ dueDateButton: true })} />
                    // onSelect={this.handleDueDateSelection}/>
            );
        }
    }

    // // NOTE: need to find a way to auto-save (persist) the dueDate onSelect
    // // Need to do the same w/ other fields (title & descrip), but implementing some sort of debounce algo
    // // The below CB doesn't work w/ the JS event loop...?
    // handleDueDateSelection() {   
    //     this.handleChange("dueOn");
    //     const { updateTask } = this.props;
    //     const task = this.state;
    //     updateTask(task);
    // }

    displaySectionDropdown() {
        // debugger
        const sectionDropdown = document.getElementById("section-dropdown-menu")
        sectionDropdown.className = "section-dropdown-menu";
        // debugger
    }

    selectSection(id) {
        return e => {
            e.preventDefault();
            const sectionDropdown = document.getElementById("section-dropdown-menu")
            sectionDropdown.className = "section-dropdown-menu-hidden";
            // debugger
            this.setState({ sectionId: id, section: this.props.sections[id] });
        };
    }



    render() {
        // debugger
        const { id, name, description, project,
            sectionId, assignee, dueOn,
            completed, completedAt,
            createdAt, updatedAt } = this.state;
        
        const section = this.props.sections[sectionId];

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
            taskStatusMessage = <div>{assignee.primaryEmail} marked this task complete.  {timeAgoSinceCompletion}</div>
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
                                {this.toggleDatePicker()}
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
                                <div className="task-show-section-label" 
                                        onClick={this.displaySectionDropdown}>
                                        {/* onClick={() => window.alert("open dropdown!")}> */}
                                        {/* onMouseLeave={() => window.alert("close dropdown")}> */}
                                    <p>{section.name}</p>
                                    <SectionListDropdown sections={this.props.sections} section={section} 
                                                        selectSection={this.selectSection}/>
                                </div>
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