import React from 'react';
import ProjectListView from './project_list_view';
import ProjectBoardView from './project_board_view';
import { Link } from 'react-router-dom';

class ProjectShow extends React.Component {
    constructor(props) {
        super(props);
        this.handleRedirectToHome = this.handleRedirectToHome.bind(this);
    }

    componentDidMount() {
        const { fetchProject, fetchSections } = this.props;
        fetchProject(this.props.match.params.projectId);
        fetchSections(this.props.match.params.projectId);
    }

    handleRedirectToHome(e) {
        // e.preventDefault();
        const { receiveNavHeader, receiveMainContent } = this.props;  // may need to add constructor method to bind this event handler
        receiveNavHeader("Home");
        receiveMainContent("projectIndex");
    }

    render() {
        const { project, openEditProjectModal, openDeleteProjectModal, sections } = this.props;
        console.log(this.props);
        let layout;
        if (!project) {
            return null;
        } else if (project.layout === "list") {
            layout = <ProjectListView project={project} 
                                        openEditProjectModal={openEditProjectModal} 
                                        openDeleteProjectModal={openDeleteProjectModal}
                                        sections={sections} />;
        } else {
            layout = <ProjectBoardView project={project} 
                                        openEditProjectModal={openEditProjectModal} 
                                        openDeleteProjectModal={openDeleteProjectModal}
                                        sections={sections} />;
        }

        return (
            <div className="project-show-container">
                {layout}
                {/* <Link to="/home/projects" onClick={this.handleRedirectToHome}>Back to all projects</Link> */}
                {/* <section className="project-info"> */}
                    {/* <h1>Name: {project.name}</h1> */}
                    {/* <div>Description: {project.description}</div> */}
                    {/* <div>Layout: {project.layout}</div> */}
                    {/* <button onClick={openEditProjectModal}>Edit Project!</button> */}
                    {/* <button onClick={openDeleteProjectModal}>Delete Project?</button> */}
                    {/* {layout} */}
                {/* </section> */}
                {/* <section>Right section</section> */}
            </div>
        );
    }
}

export default ProjectShow;