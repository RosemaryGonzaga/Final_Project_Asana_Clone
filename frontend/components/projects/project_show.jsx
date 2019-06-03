import React from 'react';
import ProjectListView from './project_list_view';
import ProjectBoardView from './project_board_view';

class ProjectShow extends React.Component {
    componentDidMount() {
        const { fetchProject } = this.props;
        fetchProject(this.props.match.params.projectId);
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
            <div className="project-show-container">{layout}</div>
        );
    }
}

export default ProjectShow;