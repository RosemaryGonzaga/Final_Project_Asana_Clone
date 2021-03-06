import React from 'react';
import { timeAgoFormatted, MONTHS } from '../../util/time_ago_format_helper';
// import { closeModal } from '../../actions/modal_actions';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { SectionListDropdown } from './section_list_dropdown';
import UserListDropdown from './user_list_dropdown';
import AvatarToken from '../avatars/avatar_token';

// import "react-datepicker/dist/react-datepicker.css";
// import "node_modules/react-datepicker/dist/react-datepicker.css";   // node_modules/react-datepicker/dist/react-datepicker.css
// import "../../../node_modules/react-datepicker/dist/react-datepicker.css";   // node_modules/react-datepicker/dist/react-datepicker.css


class TaskShow extends React.Component {
    constructor(props) {
        super(props);

        // const { task, sections, projects, users } = this.props;
        const { task, sections, projects } = this.props;
        const { id, name, description, projectId,
            sectionId, assigneeId, dueOn,
            completed, completedAt,
            createdAt, updatedAt } = task;
        // const section = sections[sectionId];    // move this to the render method? (similar to what I did w/ assignee?)
        const project = projects[projectId];    // move this to the render method? (similar to what I did w/ assignee?)
        // const assignee = users[assigneeId];  // assignee only gets set once (constructor method) ... better to set this var's value in the render method

        // Local state
        this.state = { 
            id, name, description, project, 
            // section, assignee, dueOn, completed, 
            assigneeId, dueOn, completed, 
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
        this.handleCloseTaskShow = this.handleCloseTaskShow.bind(this);
        this.selectUser = this.selectUser.bind(this);
        // this.toggleTaskAssignment = this.toggleTaskAssignment.bind(this);
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

        // Update "Mark Complete / Completed" button if the task's completion status has changed
        if (this.props.task.completed !== prevProps.task.completed) {
            this.setState({ ...this.props.task });
        }
    }

    handleSubmit(e) {
        // debugger
        e.preventDefault();
        const { updateTask } = this.props;
        const task = this.state;
        updateTask(task);

        // // Added .then CB so dueDate button toggles its appearance
        // // ...actually, not needed since I pass onSelect prop to React DatePicker component
        // updateTask(task).then(payload => this.setState({ dueDateButton: true }));   
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
        // const completedAt = new Date();
        const completedAt = completed ? null : new Date();
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
        let dueDate = dueOn;    // dueOn is null if no date chosen
        let removeBtn = (
            <div className="remove-btn-hidden">
                <i className="fas fa-times"></i>
            </div>
        );

        if (dueOn) {
            dueDate = `${MONTHS[new Date(dueOn).getMonth()]} ${new Date(dueOn).getDate()}`
            removeBtn = (
                <div className="remove-btn-visible" onClick={e => this.setState({ dueOn: null })}>
                    <i className="fas fa-times"></i>
                </div>
            );
        }

        if (dueDateButton) {
            return (
                <div className="task-show-due-date-button"
                    onClick={e => this.setState({ dueDateButton: false })}>
                    <div className="task-show-calendar-icon">
                        <i className="far fa-calendar"></i>
                    </div>
                    <div className="task-show-due-date-text">
                        <p className="task-show-due-date-label">Due Date</p>
                        <p>{dueDate}</p>
                    </div>
                    {/* <div onClick={e => this.setState({ dueOn: null })}>
                        <i class="fas fa-times"></i>
                    </div> */}
                    {removeBtn}
                </div>
            );
        } else {
            return (
                <DatePicker popperPlacement="bottom-start"
                    // placeholderText="Click to select a due date"
                    // selected={dueOn ? new Date(dueOn) : new Date() }
                    startOpen={true}
                    selected={dueOn ? new Date(dueOn) : null }
                    onChange={this.handleChange("dueOn")} 
                    onSelect={() => this.setState({ dueDateButton: true })}
                    onClickOutside={() => this.setState({ dueDateButton: true })}/>
                    // onBlur={() => this.setState({ dueDateButton: true })} />
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

    displayUserDropdown() {
        const userDropdown = document.getElementById("user-dropdown-menu")
        userDropdown.className = "user-dropdown-menu";
    }

    selectSection(id) {
        return e => {
            // Note: e.stopPropagation prevents the click from bubbling up to dropdown parent 
            // (when the click reached the parent, the menu would re-open, so it never looked like the menu closed)
            e.stopPropagation(); 
            const sectionDropdown = document.getElementById("section-dropdown-menu")
            sectionDropdown.className = "section-dropdown-menu-hidden";
            // debugger
            this.setState({ sectionId: id });
            // this.setState({ sectionId: id, section: this.props.sections[id] });
        };
    }

    selectUser(id) {
        return e => {
            e.stopPropagation();
            const userDropdown = document.getElementById("user-dropdown-menu")
            userDropdown.className = "user-dropdown-menu-hidden";
            this.setState({ assigneeId: id });
        };
    }

    handleCloseTaskShow(e) {
        e.preventDefault();
        const { exitTaskShowUponTaskDeletion } = this.props;
        const path = `/home/projects/${this.state.projectId}`;
        this.props.history.push(path);
        exitTaskShowUponTaskDeletion();
    }

    toggleTaskAssignment() {
        const { assigneeId } = this.state;
        const { users } = this.props;
        const assignee = users[assigneeId];
        const { fullName, primaryEmail } = assignee;

        return (
            <div className="task-show-assign-button" onClick={this.displayUserDropdown}>
                <AvatarToken user={assignee} size="medium"/>
                <div>
                    <p className="task-show-assign-text1">Assigned to</p>
                    <p className="task-show-assign-text2">{fullName ? fullName : primaryEmail}</p>
                    <UserListDropdown selectUser={this.selectUser} />
                </div>
            </div>
        );
    }



    render() {
        // debugger
        const { id, name, description, project,
            // sectionId, assignee, dueOn,  // refactored state to track assigneeId, not assignee
            sectionId, assigneeId, dueOn,
            completed, completedAt,
            createdAt, updatedAt } = this.state;

        const { currentUser } = this.props;
        
        const section = this.props.sections[sectionId];

        const assignee = this.props.users[assigneeId];
        // let initials = assignee.primaryEmail.slice(0, 2).toUpperCase(); // use full name later
        // debugger
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
            // NEED TO REFACTOR THE BELOW LINE - ADD FIELD TO DB THAT STORES WHO MARKED THE TASK COMPLETE
            taskStatusMessage = <div>{currentUser.fullName ? currentUser.fullName : currentUser.primaryEmail} marked this task complete.  {timeAgoSinceCompletion}</div>
        } else {
            taskStatusMessage = null;
        }

        const markCompleteBtn = (
            <button className="mark-complete-btn" onClick={this.toggleComplete} type="button">
                <i className="fas fa-check" id="fas-fa-check-task-button"></i>
                Mark Complete
            </button>
        );

        const completedBtn = (
            <button className="mark-complete-btn completed" onClick={this.toggleComplete} type="button">
                <i className="fas fa-check" id="fas-fa-check-task-button-completed"></i>
                Completed
            </button>
        );

        const completionStatusBtn = completed ? completedBtn : markCompleteBtn;


        return (
            <div className="task-show-container">
                <form className="task-show-form" onSubmit={this.handleSubmit}>
                    <h1 className="task-show-header">
                        {/* <button className="mark-complete-btn" onClick={this.toggleComplete} type="button">
                            <i className="fas fa-check" id="fas-fa-check-task-button"></i>
                            Mark Complete
                        </button> */}
                        {completionStatusBtn}
                        <input className="random-buttons" type="submit" value="Submit"/>
                        {/* <button onClick={this.handleDeleteTask}>Delete task</button> */}


                        <Link to={`/home/projects/${this.state.projectId}`}
                            // className="section-index-item-container"
                            className="random-buttons"
                            onClick={this.handleDeleteTask}
                            id={this.state.id} task={this.state} > Delete task
                        </Link>

                        <button className="task-show-close-btn" onClick={this.handleCloseTaskShow} >
                            {/* <img src={window.closeButtonHover} alt="x" /> */}
                            <i className="fas fa-times"></i>
                        </button>
                    </h1>
                    <div className="task-show-form-content">
                        <section className="task-show-section1">
                            <input type="text" value={name}
                                onChange={this.handleChange("name")} 
                                className="task-show-name-input" />
                            <div className="task-show-section1-bottom">
                                {/* <div className="task-show-assign-button">
                                    <div className="avatar-task-show-large">{initials}</div>
                                    <div>
                                        <p className="task-show-assign-text1">Assigned to</p>
                                        <p className="task-show-assign-text2">{assignee.primaryEmail}</p>
                                    </div>
                                </div> */}
                                {this.toggleTaskAssignment()}
                                {this.toggleDatePicker()}
                            </div>
                        </section>
                        <section className="task-show-section2">
                            <div className="task-show-section2-top">
                                <i className="fas fa-align-left"></i>
                                <textarea className="task-show-description-input"
                                    value={description}
                                    onChange={this.handleChange("description")}
                                    placeholder="Description">
                                </textarea>
                            </div>
                            <div className="task-show-section2-bottom">
                                <i className="far fa-clipboard"></i>
                                <div className="task-show-project-icon">{project.name}</div>
                                <div className="task-show-section-label" 
                                        onClick={this.displaySectionDropdown}>
                                        {/* onClick={() => window.alert("open dropdown!")}> */}
                                        {/* onMouseLeave={() => window.alert("close dropdown")}> */}
                                    <p>{section.name}  <i className="fas fa-angle-down"></i></p>
                                    <SectionListDropdown sections={this.props.sections} section={section} 
                                                        selectSection={this.selectSection}/>
                                </div>
                            </div>
                        </section>
                        <section className="task-show-section3">
                            <div className="task-show-section3-center">
                                {/* NEED TO REFACTOR THE BELOW TWO LINES - ADD FIELDS TO DB THAT STORES WHO CREATED & LAST UPDATED THE TASK */}
                                <p>{currentUser.fullName ? currentUser.fullName : currentUser.primaryEmail} created this task.    {timeAgoSinceCreation}</p>
                                <p>{currentUser.fullName ? currentUser.fullName : currentUser.primaryEmail} updated this task.    {timeAgoSinceUpdate}</p>
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