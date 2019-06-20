import React from 'react';
import SectionContainer from '../sections/section_container';
import TaskShowContainer from '../tasks/task_show_container';
import AddTaskContainer from '../tasks/add_task_container';
import { Link } from 'react-router-dom';

class ProjectListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,    // should we be keeping track of project in local state?
            taskToRenderId: "description",  // when project first renders, display the description box on right instead of the task show/edit "form"/page
        };
        this.handleOpenTaskShowClick = this.handleOpenTaskShowClick.bind(this);
        this.handleAddTaskClick = this.handleAddTaskClick.bind(this);
        this.displayTaskShow = this.displayTaskShow.bind(this);
        this.exitTaskShowUponTaskDeletion = this.exitTaskShowUponTaskDeletion.bind(this);
        // this.handleAddSection = this.handleAddSection.bind(this);
    }

    // componentDidMount() {   // not sure if this is needed (works w/o fetching sections)
    //     const { fetchSections } = this.props;
    //     fetchSections
    // }

    // componentDidUpdate() {   // not sure if this is needed (works w/o fetching sections)
    //     const { fetchSections } = this.props;
    //     fetchSections
    // }

    handleOpenTaskShowClick(e) {
        // e.preventDefault(); // necessary?
        // this.setState({ taskToRenderId: e.target.id });
        // debugger
        this.setState({ taskToRenderId: e.currentTarget.id });
    }

    handleAddTaskClick(e) {
        // debugger
        this.setState({ taskToRenderId: "new task" })
    }

    // This CB will be passed to add task component
    // ... when a new task is submitted (created), it will change this component's state
    // ...taskToRenderId should change from "new task to the id of the last task that was added --> take this from redux store (this component's props)
    displayTaskShow(id) {
        // debugger
        // const taskIds = Object.keys(this.props.tasks);
        // const latestTaskId = Math.max(...taskIds);
        // debugger
        // this.setState({ taskToRenderId: latestTaskId })
        this.setState({ taskToRenderId: id });
        // debugger
    }

    exitTaskShowUponTaskDeletion() {
        this.setState({ taskToRenderId: "description" });
    }



    // handleAddSection(e) {
    //     // e.preventDefault();
    //     debugger
    //     const blankSection = { 
    //         name: "Section1", 
    //         description: "", 
    //         layout: "list", 
    //         project_id: this.props.project.id, 
    //         assignee_id: this.props.currentUserId, 
    //         due_on: "" };

    //     const { createSection } = this.props;
    //     createSection(blankSection);
    // }

    render() {
        // debugger
        const { project, sections, openEditProjectModal, openDeleteProjectModal } = this.props;
        // const firstSectionId = Object.keys(sections)[0];
        // debugger
        const sectionItems = sections.map(section => {
            return <SectionContainer section={section} key={section.id} handleOpenTaskShowClick={this.handleOpenTaskShowClick} />;
        });

        // // need to define this as description box or task show component, depending on whether user has clicked a task (section index item) 
        // // pass callback down to section, then down to section index item to set the state here?
        // const rightComponentToRender = (<div className="task-show-wrapper">conditionally render task show component here</div>);
        const descriptionComponent = (<div className="project-list-description">
                                            <p>Description:</p>
                                            <p>{project.description}</p>
                                        </div>);
        // const taskComponent = <div>Id of clicked task: {this.state.taskToRenderId}</div>;
        const taskComponent = <TaskShowContainer taskId={this.state.taskToRenderId} 
                                                exitTaskShowUponTaskDeletion={this.exitTaskShowUponTaskDeletion} />;

        // const newTaskComponent = <div>Going to render the new task form</div>; // replace with real component later
        // const newTaskComponent = <AddTaskContainer project={project} sections={sections} />;  
        const newTaskComponent = <AddTaskContainer project={project} displayTaskShow={this.displayTaskShow} />;  
        

        // let rightComponentToRender = this.state.taskToRenderId !== "description" ? taskComponent : descriptionComponent;
        // let mainContentClass = this.state.taskToRenderId !== "description" ? "project-show-list-main-content-skinny" : "project-show-list-main-content";
        // debugger

        let rightComponentToRender = descriptionComponent;
        let mainContentClass = "project-show-list-main-content";
        if (this.state.taskToRenderId === "description") {
            rightComponentToRender = descriptionComponent;
            mainContentClass = "project-show-list-main-content";
            // debugger
        } else if (this.state.taskToRenderId === "new task") {
            rightComponentToRender = newTaskComponent;
            mainContentClass = "project-show-list-main-content-skinny";
            // debugger
        } else {
            rightComponentToRender = taskComponent;
            mainContentClass = "project-show-list-main-content-skinny";
            // debugger
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
                    <div className="add-section-container"><i className="fas fa-plus"></i>Add Section</div>
                    {/* <a href="#" className="add-section-container" onClick={this.handleAddSection}><i className="fas fa-plus"></i>Add Section</a> */}
                </div>
                
                { rightComponentToRender }
            </div>
        );
    }
}

export default ProjectListView;