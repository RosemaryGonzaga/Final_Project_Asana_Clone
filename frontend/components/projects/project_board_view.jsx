import React from 'react';

class ProjectBoardView extends React.Component {

    render() {
        const { project, openEditProjectModal } = this.props;
        // To do once sections / columns are implemented: map over sections (col) and render them in the 'board-cols' div below
        // Render first three sections in the first three divs

        return (
            <div className="board-project-wrapper">
                <section className="board-project-info">
                    <h1>Name: {project.name}</h1>
                    <div>Description: {project.description}</div>
                    <div>Layout: {project.layout}</div>
                    <button onClick={openEditProjectModal}>Edit Project</button>
                </section>
                <div>Show project description</div>
                <section className="board-cols">
                    <div className="board-col">To Do</div>
                    <div className="board-col">In Progress</div>
                    <div className="board-col">Done</div>
                </section>
            </div>
        );
    }
}

export default ProjectBoardView;