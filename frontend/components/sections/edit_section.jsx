import React from 'react';
import { timeAgoFormatted, MONTHS } from '../../util/time_ago_format_helper';
import { Link } from 'react-router-dom';
import UserListDropdown from '../tasks/user_list_dropdown';
import DatePicker from 'react-datepicker';


class EditSection extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        const { section, sections, projects, users } = this.props;
        const { id, name, description, projectId,
            assigneeId, dueOn, layout,
            completed, completedAt,
            createdAt, updatedAt } = section;
        // const section = sections[sectionId];
        const project = projects[projectId];
        // const assignee = users[assigneeId];

        this.state = { id, name, description, project, 
            assigneeId, dueOn, layout, completed, 
            completedAt, createdAt, updatedAt, projectId,
            dueDateButton: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.handleDeleteSection = this.handleDeleteSection.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.handleCloseTaskShow = this.handleCloseTaskShow.bind(this);
    }    

    componentDidMount() {
        // debugger
        const { fetchSection, section, sectionId } = this.props;
        fetchSection(section.id);
    }

    componentDidUpdate(prevProps) {
        // debugger
        if (this.state.id.toString() !== prevProps.sectionId.toString()) {  // need to use taskId b/c task.id is undefined in prevProps if this component updates after deleting a task
            this.setState({ ...this.props.section });
        }
    }

    handleSubmit(e) {
        // debugger
        e.preventDefault();
        const { updateSection } = this.props;
        const section = this.state;
        updateSection(section);
    }

    handleChange(field) {
        return e => {
            if (e.target) {
                this.setState({ [field]: e.target.value });
            } else {
                this.setState({ [field]: e });   // added this for DatePicker (to set DueDate)
            }
        };
    }

    toggleComplete(e) {
        const { updateSection, fetchSection } = this.props;
        const { id, completed } = this.state;
        const completedAt = new Date();
        const that = this;
        updateSection({ id, completed: !completed, completedAt }).then(payload => {
            fetchSection(id);
            that.setState({ completed: !completed, completedAt });
        });
    }

    // Right now, user can't delete Section. 
    // Need to tweak delete functionality so they can only delete an empty section (section with no tasks)
    handleDeleteSection(e) {
        e.preventDefault();
        console.log("Working on this feature");
        const { sections, deleteSection, exitTaskShowUponTaskDeletion } = this.props;
        if (Object.keys(sections).length > 1) {
            deleteSection(this.state.id);
            const path = `/home/projects/${this.state.projectId}`;
            this.props.history.push(path);
            exitTaskShowUponTaskDeletion();
        }
    }

    displayUserDropdown() {
        const userDropdown = document.getElementById("user-dropdown-menu")
        userDropdown.className = "user-dropdown-menu";
    }

    selectUser(id) {
        return e => {
            e.stopPropagation();
            const userDropdown = document.getElementById("user-dropdown-menu")
            userDropdown.className = "user-dropdown-menu-hidden";
            this.setState({ assigneeId: id });
        };
    }

    toggleSectionAssignment() {
        const { assigneeId } = this.state;
        const { users } = this.props;
        const assignee = users[assigneeId];
        const { fullName, primaryEmail } = assignee;

        let initials = "";
        if (fullName) {
            const nameParts = fullName.trim().split(' ');
            if (nameParts.length > 1) {
                initials = nameParts.slice(0, 2).map(part => part.slice(0, 1).toUpperCase());
            } else {
                initials = fullName.slice(0, 2);
            }
        } else {
            initials = primaryEmail.slice(0, 2);
        }

        return (
            <div className="task-show-assign-button" onClick={this.displayUserDropdown}>
                <div className="avatar-task-show-large">{initials}</div>
                <div>
                    <p className="task-show-assign-text1">Assigned to</p>
                    <p className="task-show-assign-text2">{fullName ? fullName : primaryEmail}</p>
                    <UserListDropdown selectUser={this.selectUser} />
                </div>
            </div>
        );
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
                    selected={dueOn ? new Date(dueOn) : null}
                    onChange={this.handleChange("dueOn")}
                    onSelect={() => this.setState({ dueDateButton: true })}
                    onClickOutside={() => this.setState({ dueDateButton: true })} />
                // onBlur={() => this.setState({ dueDateButton: true })} />
                // onSelect={this.handleDueDateSelection}/>
            );
        }
    }

    handleCloseTaskShow(e) {
        e.preventDefault();
        const { exitTaskShowUponTaskDeletion } = this.props;
        const path = `/home/projects/${this.state.projectId}`;
        this.props.history.push(path);
        exitTaskShowUponTaskDeletion();
    }


    render() {

        const { id, name, description, project,
            assignee, dueOn, layout, 
            completed, completedAt,
            createdAt, updatedAt } = this.state;

        const { currentUser, sections } = this.props;

        // let initials = assignee.primaryEmail.slice(0, 2).toUpperCase(); // use full name later

        // Calculation of time since section creation --> factor out into helper files later?
        const currentDateTime = new Date();
        let timeSinceCreation = Date.parse(currentDateTime) - Date.parse(createdAt);
        const timeAgoSinceCreation = timeAgoFormatted(timeSinceCreation);

        // Calculation of time since latest section update
        let timeSinceUpdate = Date.parse(currentDateTime) - Date.parse(updatedAt);
        const timeAgoSinceUpdate = timeAgoFormatted(timeSinceUpdate);

        // Section completion status
        let sectionStatusMessage;
        if (completed) {
            // add checkmark icon inside sectionStatusMessage
            let timeSinceCompletion = Date.parse(currentDateTime) - Date.parse(completedAt);
            const timeAgoSinceCompletion = timeAgoFormatted(timeSinceCompletion);
            sectionStatusMessage = <div>{currentUser.fullName ? currentUser.fullName : currentUser.primaryEmail} marked this section complete.  {timeAgoSinceCompletion}</div>
        } else {
            sectionStatusMessage = null;
        }

        let deleteSectionButton = null;

        if (Object.keys(sections).length > 1) {
            deleteSectionButton = (
                <Link to={`/home/projects/${this.state.projectId}`}
                    // className="section-index-item-container"
                    className="random-buttons"
                    onClick={this.handleDeleteSection}
                    id={this.state.id} section={this.state} > Delete section
                </Link>
            );
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


                        {/* <Link to={`/home/projects/${this.state.projectId}`}
                            // className="section-index-item-container"
                            className="random-buttons"
                            onClick={this.handleDeleteSection}
                            id={this.state.id} section={this.state} > Delete section
                        </Link> */}

                        {deleteSectionButton}

                        <button className="task-show-close-btn" onClick={this.handleCloseTaskShow} >
                            {/* <img src={window.closeButtonHover} alt="x" /> */}
                            <i class="fas fa-times"></i>
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

                                {this.toggleSectionAssignment()}
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
                                    onChange={this.handleChange("description")}>
                                </textarea>
                            </div>
                            <div className="task-show-section2-bottom">
                                <i className="far fa-clipboard"></i>
                                <div className="task-show-project-icon">{project.name}</div>
                                {/* <div className="task-show-section-label">{section.name}</div> */}
                            </div>
                        </section>
                        <section className="task-show-section3">
                            <div className="task-show-section3-center">
                                <p>{currentUser.fullName ? currentUser.fullName : currentUser.primaryEmail} created this section.    {timeAgoSinceCreation}</p>
                                <p>{currentUser.fullName ? currentUser.fullName : currentUser.primaryEmail} updated this section.    {timeAgoSinceUpdate}</p>
                                {sectionStatusMessage}
                            </div>
                        </section>
                    </div>
                    <div className="task-show-form-footer"></div>
                </form>
            </div>
        );
    }
}

export default EditSection;