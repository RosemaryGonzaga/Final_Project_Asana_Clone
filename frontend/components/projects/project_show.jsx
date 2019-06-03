import React from 'react';
import ProjectListView from './project_list_view';
import ProjectBoardView from './project_board_view';

class ProjectShow extends React.Component {
    componentDidMount() {
        // debugger
        const { project, fetchProject } = this.props;
        fetchProject(project.id);
        // debugger
    }

    render() {
        const { project } = this.props;
        // debugger
        let layout;
        if (project.layout === "list") {
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