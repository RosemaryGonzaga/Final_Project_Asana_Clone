import React from 'react';
import { timeAgoFormatted, MONTHS } from '../../util/time_ago_format_helper';
import DatePicker from 'react-datepicker';
import { SectionListDropdown } from './section_list_dropdown';
import UserListDropdown from './user_list_dropdown';
import AvatarToken from '../avatars/avatar_token';

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
            // assignee: `${this.props.currentUser.primaryEmail}`,       // need to dispatch assignee (user with the id
            dueOn: "", 
            completed: "",
            completedAt: "",
            dueDateButton: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.toggleComplete = this.toggleComplete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectSection = this.selectSection.bind(this);
        this.handleCloseTaskShow = this.handleCloseTaskShow.bind(this);
        this.selectUser = this.selectUser.bind(this);
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
        // debugger
        e.preventDefault();
        const { createTask, displayTaskShow } = this.props;
        const task = this.state;
        createTask(task).then(payload => {
            displayTaskShow(payload.task.id);
            const path = `/home/projects/${payload.task.projectId}/${payload.task.id}`;
            this.props.history.push(path);
        });
    }

    // handleChange(field) {
    //     return e => {
    //         this.setState({ [field]: e.target.value });
    //     };
    // }

    handleChange(field) {
        return e => {
            if (e.target) {
                this.setState({ [field]: e.target.value });
            } else {
                this.setState({ [field]: e });   // added this for DatePicker (to set DueDate)
            }
        };
    }

    // toggleComplete(e) {  // this is disabled in the AddTask form
    //     const { createTask, fetchTask } = this.props;
    //     const { id, completed } = this.state;
    //     const completedAt = new Date();
    //     const that = this;
    //     createTask({ id, completed: !completed, completedAt }).then(payload => {
    //         fetchTask(id);
    //         that.setState({ completed: !completed, completedAt });
    //     });
    // }

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
                    selected={dueOn ? new Date(dueOn) : null}
                    onChange={this.handleChange("dueOn")}
                    onSelect={() => this.setState({ dueDateButton: true })}
                    onClickOutside={() => this.setState({ dueDateButton: true })} />
                // onBlur={() => this.setState({ dueDateButton: true })} />
                // onSelect={this.handleDueDateSelection}/>
            );
        }
    }

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
        // debugger
        return e => {
            // debugger
            // Note: e.stopPropagation prevents the click from bubbling up to dropdown parent 
            // (when the click reached the parent, the menu would re-open, so it never looked like the menu closed)
            e.stopPropagation();
            const sectionDropdown = document.getElementById("section-dropdown-menu")
            sectionDropdown.className = "section-dropdown-menu-hidden";
            // debugger
            this.setState({ sectionId: id, section: this.props.sections[id].name });
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

    toggleTaskAssignment() {
        const { assigneeId } = this.state;
        const { users } = this.props;
        const assignee = users[assigneeId];
        const { fullName, primaryEmail } = assignee;

        return (
            <div className="task-show-assign-button" onClick={this.displayUserDropdown}>
                <AvatarToken user={assignee} size="medium" />
                <div>
                    <p className="task-show-assign-text1">Assigned to</p>
                    <p className="task-show-assign-text2">{fullName ? fullName : primaryEmail}</p>
                    <UserListDropdown selectUser={this.selectUser} />
                </div>
            </div>
        );
    }

    handleCloseTaskShow(e) {
        e.preventDefault();
        const { exitTaskShowUponTaskDeletion } = this.props;
        // deleteTask(this.state.id);
        const path = `/home/projects/${this.state.projectId}`;
        this.props.history.push(path);
        exitTaskShowUponTaskDeletion();
    }



    render() {

        const { id, name, description, project,
            section, assigneeId, dueOn,
            completed, completedAt,
            createdAt, updatedAt, sectionId } = this.state;

        const { currentUser } = this.props;

        const assignee = this.props.users[assigneeId];

        // let initials = assignee.primaryEmail.slice(0, 2).toUpperCase(); // use full name later
        // let initials = assignee.slice(0, 2).toUpperCase(); // use full name later


        return (
            <div className="task-show-container">
                <form className="task-show-form" onSubmit={this.handleSubmit}>
                    <h1 className="task-show-header">
                        {/* <button className="mark-complete-btn" onClick={this.toggleComplete} type="button" disabled> */}
                        <button className="mark-complete-btn" type="button" disabled>
                            <i className="fas fa-check" id="fas-fa-check-task-button"></i>
                            Mark Complete
                        </button>
                        <input className="random-buttons" type="submit" value="Submit" />
                        <button className="random-buttons">Delete task</button>
                        <button className="task-show-close-btn" onClick={this.handleCloseTaskShow} >
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
                                {/* <div className="task-show-assign-button">
                                    <div className="avatar-task-show-large">{initials}</div>
                                    <div>
                                        <p className="task-show-assign-text1">Assigned to</p>
                                        <p className="task-show-assign-text2">{assignee}</p>
                                    </div>
                                </div> */}
                                {this.toggleTaskAssignment()}
                                {this.toggleDatePicker()}
                                {/* <div className="task-show-due-date-button">
                                    <div className="task-show-calendar-icon">
                                        <i className="far fa-calendar"></i>
                                    </div>
                                    <p>Due Date</p>
                                </div> */}
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
                                {/* <div className="task-show-project-icon">{project.name}</div> */}
                                <div className="task-show-project-icon">{project}</div>
                                <div className="task-show-section-label" 
                                        onClick={this.displaySectionDropdown}>
                                    {/* <p>{section.name}</p> */}
                                    <p>{section}</p>
                                    <SectionListDropdown sections={this.props.sections} section={this.props.sections[sectionId]} 
                                                        selectSection={this.selectSection}/>
                                    {/* <SectionListDropdown sections={this.props.sections} section={section} 
                                                        selectSection={this.selectSection}/> */}
                                </div>
                            </div>
                        </section>
                        <section className="task-show-section3">
                            <div className="task-show-section3-center">
                                <p>{currentUser.fullName ? currentUser.fullName : currentUser.primaryEmail} created this task.    Just now</p>
                                <p>{currentUser.fullName ? currentUser.fullName : currentUser.primaryEmail} updated this task.    Just now</p>
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