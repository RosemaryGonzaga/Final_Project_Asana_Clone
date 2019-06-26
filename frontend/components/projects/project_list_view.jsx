import React from 'react';
import SectionContainer from '../sections/section_container';
import TaskShowContainer from '../tasks/task_show_container';
import AddTaskContainer from '../tasks/add_task_container';
import EditSectionContainer from '../sections/edit_section_container';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';

class ProjectListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,    // should we be keeping track of project in local state?
            taskToRenderId: "description",  // when project first renders, display the description box on right
        };
        this.handleOpenTaskShowClick = this.handleOpenTaskShowClick.bind(this);
        this.handleAddTaskClick = this.handleAddTaskClick.bind(this);
        this.displayTaskShow = this.displayTaskShow.bind(this);
        this.exitTaskShowUponTaskDeletion = this.exitTaskShowUponTaskDeletion.bind(this);
        this.handleAddSection = this.handleAddSection.bind(this);
        this.handleOpenSectionShowClick = this.handleOpenSectionShowClick.bind(this);
    }

    // componentDidMount() {   // not sure if this is needed (works w/o fetching sections)
    //     const { fetchSections } = this.props;
    //     fetchSections
    // }

    // This is needed so sections don't get populated in the wrong projects when clicking from one project to another
    // Also, it fixed the double-click issue!! (before, I needed to double click a task index item to show the task)
    componentDidUpdate(prevProps, prevState) {
        // Only fetch sections if they have changed (compare prevProps w/ current props)...
        // ...or if the taskToRenderId has changed (compare prevState w/ current state)...
        // ...otherwise you'll be stuck in an infinite loop
        // Need to use lodash's isEqual to check for equivalence (instead of ===)
        // NOTE: now there's a blip when switching from one project to another ... 
        // ...nothing inaccurate but needs to be addressed for smoother UX
        const equalProps = isEqual(prevProps.sections, this.props.sections);
        const equalState = isEqual(prevState.taskToRenderId, this.state.taskToRenderId); // check this condition to resolve double-click issue
        if (!equalProps || !equalState) {
            const { fetchSections } = this.props;
            fetchSections(this.state.project.id);
        }
    }

    handleOpenTaskShowClick(e) {
        // debugger
        this.setState({ taskToRenderId: e.currentTarget.id });  // or e.target.id? (what's the difference?)
    }

    handleAddTaskClick(e) {
        // debugger
        this.setState({ taskToRenderId: "new task" })
    }

    // This CB will be passed to AddTask component
    // When a new task is submitted (created), it will change this component's state
    // ...so that the TaskShow / EditTask component is rendered instead of the AddTask component 
    // ...(they look the same but are functionally different)
    // NOTE: this is different from the handleOpenTaskShowClick callback
    displayTaskShow(id) {
        // debugger
        this.setState({ taskToRenderId: id });  // another way to get the id: from redux store
    }

    exitTaskShowUponTaskDeletion() {
        // debugger
        this.setState({ taskToRenderId: "description" });
    }

    handleOpenSectionShowClick(id) {
        return e => {
            // debugger
            this.setState({ taskToRenderId: `section${id}` });
        }
    }



    handleAddSection(e) {
        e.preventDefault();
        // debugger
        const blankSection = { 
            name: "New Section", 
            description: "", 
            layout: this.props.project.layout,
            projectId: this.props.project.id, 
            assigneeId: this.props.currentUserId, 
            dueOn: "" };

        const { createSection } = this.props;
        createSection(blankSection);
    }
    

    render() {
        // debugger
        const { project, sections, openEditProjectModal, openDeleteProjectModal } = this.props;
        // const firstSectionId = Object.keys(sections)[0];
        // debugger
        const sectionItems = sections.map(section => {
            return <SectionContainer section={section} key={section.id} 
                                        handleOpenTaskShowClick={this.handleOpenTaskShowClick} 
                                        handleOpenSectionShowClick={this.handleOpenSectionShowClick} />;
        });

        // when user first lands on project show page, before clicking any specific tasks, the description will render
        const descriptionComponent = (<div className="project-list-description">
                                            <p>Description:</p>
                                            <p>{project.description}</p>
                                        </div>);

        // pass callback down to TaskShowContainer so Project can know to show its description instead of the TaskShow
        // ...when user deletes a task
        // debugger
        const taskComponent = <TaskShowContainer taskId={this.state.taskToRenderId} 
                                                exitTaskShowUponTaskDeletion={this.exitTaskShowUponTaskDeletion} />;

        // pass callback down to AddTaskContainer so Project can know to display the TaskShow instead of AddTask
        // ...when user adds a task
        const newTaskComponent = <AddTaskContainer project={project} displayTaskShow={this.displayTaskShow}
                                                exitTaskShowUponTaskDeletion={this.exitTaskShowUponTaskDeletion} />;
        // debugger
        // let sectionId = this.state.taskToRenderId.slice();
        let sectionIdProp = this.state.taskToRenderId;
        // debugger
        if (isNaN(parseInt(sectionIdProp)) && sectionIdProp.includes("section")) {
            // debugger
            sectionIdProp = sectionIdProp.slice(7, sectionIdProp.length);
        }
        // debugger
        const editSectionComponent = <EditSectionContainer sectionId={sectionIdProp}/>

        let rightComponentToRender = descriptionComponent;
        let mainContentClass = "project-show-list-main-content";
        if (this.state.taskToRenderId === "description") {
            rightComponentToRender = descriptionComponent;
            mainContentClass = "project-show-list-main-content";
        } else if (this.state.taskToRenderId === "new task") {
            rightComponentToRender = newTaskComponent;
            mainContentClass = "project-show-list-main-content-skinny";
        } else if (isNaN(parseInt(this.state.taskToRenderId)) && this.state.taskToRenderId.includes("section")) {
            rightComponentToRender = editSectionComponent;
            mainContentClass = "project-show-list-main-content-skinny";
        } else {
            rightComponentToRender = taskComponent;
            mainContentClass = "project-show-list-main-content-skinny";
        }
        // debugger
        return (
            <div className="project-show-list-layout-wrapper">
                <div className={mainContentClass}>
                    <div className="project-show-list-header">
                        <Link to={`/home/projects/${project.id}/newtask`}      // '/home/projects/newtask'
                            // className="add-task-to-project-button"
                            className="random-buttons"
                            onClick={this.handleAddTaskClick}
                            id="randomTempId" >
                            Add Task
                        </Link>

                        {/* <button>Add Task</button> */}
                        <button className="random-buttons" onClick={openEditProjectModal}>Edit Project</button>
                        <button className="random-buttons" onClick={openDeleteProjectModal}>Delete Project</button>
                    </div>
                    <ul>{sectionItems}</ul>
                    {/* <div className="add-section-container"><i className="fas fa-plus"></i>Add Section</div> */}
                    <a href="#" className="add-section-container" onClick={this.handleAddSection}><i className="fas fa-plus"></i>Add section</a>
                </div>
                
                { rightComponentToRender }
            </div>
        );
    }
}

export default ProjectListView;