import React from 'react';
import SectionContainer from '../sections/section_container';
// need to import Task Show container tp render 

class ProjectListView extends React.Component {
    // componentDidMount() {
    //     const { fetchSections } = this.props;
    //     fetchSections
    // }

    render() {
        const { project, sections, openEditProjectModal, openDeleteProjectModal } = this.props;
        const sectionItems = sections.map(section => {
            return <SectionContainer section={section} key={section.id} />;
            // return <div>{section.name}</div>
        });

        // // need to define this as description box or task show component, depending on whether user has clicked a task (section index item) 
        // // pass callback down to section, then down to section index item to set the state here?
        // const rightComponentToRender = (<div className="task-show-wrapper">conditionally render task show component here</div>);
        const rightComponentToRender = (<div className="project-list-description">Description: {project.description}</div>);

        return (
            <div className="project-show-list-layout-wrapper">
                <div className="project-show-list-main-content">
                    <div className="project-show-list-header">
                        <h1>Project: {project.name}</h1>
                        <button onClick={openEditProjectModal}>Edit Project!</button>
                        <button onClick={openDeleteProjectModal}>Delete Project?</button>
                    </div>
                    <ul>{sectionItems}</ul>
                </div>
                
                { rightComponentToRender }
            </div>
        );
    }
}

export default ProjectListView;