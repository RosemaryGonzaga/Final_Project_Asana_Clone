import React from 'react';

class ProjectListView extends React.Component {
    render() {
        const { project } = this.props;
        return (
            <div>
                <h1>Name: {project.name}</h1>
                <div>Description: {project.description}</div>
                <div>Layout: {project.layout}</div>
            </div>
        );
    }
}

export default ProjectListView;