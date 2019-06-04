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
        const { fetchProject } = this.props;
        fetchProject(this.props.match.params.projectId);
    }

    handleRedirectToHome(e) {
        // e.preventDefault();
        const { receiveNavHeader, receiveMainContent } = this.props;  // may need to add constructor method to bind this event handler
        receiveNavHeader("Home");
        receiveMainContent("projectIndex");
    }

    render() {
        const { project } = this.props;
        let layout;
        if (!project) {
            return null;
        } else if (project.layout === "list") {
            layout = <ProjectListView />;
        } else {
            layout = <ProjectBoardView />;
        }

        return (
            <div className="project-show-container">
                {layout}
                <Link to="/home" onClick={this.handleRedirectToHome}>Back to all projects</Link>
            </div>
        );
    }
}

export default ProjectShow;