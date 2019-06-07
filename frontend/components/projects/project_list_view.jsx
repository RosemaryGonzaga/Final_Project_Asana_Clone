import React from 'react';
import SectionContainer from '../sections/section_container';
import TaskShowContainer from '../tasks/task_show_container';
import { Link } from 'react-router-dom';

class ProjectListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,    // should we be keeping track of project in local state?
            taskToRenderId: "description",
        };
        this.handleOpenTaskShowClick = this.handleOpenTaskShowClick.bind(this);
        this.handleAddTaskClick = this.handleAddTaskClick.bind(this);
    }

    // componentDidMount() {   // not sure if this is needed (works w/o fetching sections)
    //     const { fetchSections } = this.props;
    //     fetchSections
    // }

    componentDidUpdate() {   // not sure if this is needed (works w/o fetching sections)
        const { fetchSections } = this.props;
        fetchSections
    }

    handleOpenTaskShowClick(e) {
        // e.preventDefault(); // necessary?
        // this.setState({ taskToRenderId: e.target.id });
        // debugger
        this.setState({ taskToRenderId: e.currentTarget.id });
    }

    handleAddTaskClick(e) {
        this.setState({ taskToRenderId: "new task" })
    }

    render() {
        // debugger
        const { project, sections, openEditProjectModal, openDeleteProjectModal } = this.props;
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
        const taskComponent = <TaskShowContainer taskId={this.state.taskToRenderId}/>;

        let rightComponentToRender = this.state.taskToRenderId !== "description" ? taskComponent : descriptionComponent;
        let mainContentClass = this.state.taskToRenderId !== "description" ? "project-show-list-main-content-skinny" : "project-show-list-main-content";
        // let rightComponentToRender = this.state.taskToRenderId ? taskComponent : descriptionComponent;
        // let mainContentClass = this.state.taskToRenderId ? "project-show-list-main-content-skinny" : "project-show-list-main-content";
        // debugger

        return (
            <div className="project-show-list-layout-wrapper">
                <div className={mainContentClass}>
                    <div className="project-show-list-header">
                        <Link to={`/home/projects/${project.id}/newtask`}      // '/home/projects/newtask'
                            className="add-task-to-project-button"
                            // onClick={handleOpenTaskShowClick}
                            id="randomTempId" >
                            Add Task!
                        </Link>

                        <button>Add Task</button>
                        <button onClick={openEditProjectModal}>Edit Project!</button>
                        <button onClick={openDeleteProjectModal}>Delete Project?</button>
                    </div>
                    <ul>{sectionItems}</ul>
                    <div className="add-section-container"><i className="fas fa-plus"></i>Add Section</div>
                </div>
                
                { rightComponentToRender }
            </div>
        );
    }
}

export default ProjectListView;