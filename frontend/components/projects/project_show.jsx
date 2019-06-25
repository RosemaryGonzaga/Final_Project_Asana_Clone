import React from 'react';
import ProjectListView from './project_list_view';
import ProjectBoardView from './project_board_view';
import { Link } from 'react-router-dom';

class ProjectShow extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.handleRedirectToHome = this.handleRedirectToHome.bind(this);
    // }

    componentDidMount() {
        const { fetchProject, fetchSections } = this.props;
        fetchProject(this.props.match.params.projectId);
        fetchSections(this.props.match.params.projectId);
    }

    render() {
        // const { project, openEditProjectModal, openDeleteProjectModal, sections } = this.props;
        let layout;
        if (!this.props.project) {
            return null;
        } else if (this.props.project.layout === "list") {
            layout = <ProjectListView {...this.props} />;
        } else {
            // debugger
            layout = <ProjectBoardView {...this.props} />;
        }

        return (
            <div className="project-show-container">
                {layout}
            </div>
        );
    }
}

export default ProjectShow;