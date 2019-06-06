import React from 'react';
import SectionContainer from '../sections/section_container';
// need to import Task Show container tp render 

class ProjectListView extends React.Component {
    // componentDidMount() {
    //     const { fetchSections } = this.props;
    //     fetchSections
    // }

    render() {
        const { project, sections } = this.props;
        const sectionItems = sections.map(section => {
            return <SectionContainer section={section} key={section.id} />;
            // return <div>{section.name}</div>
        });

        // // need to define this as description box or task show component, depending on whether user has clicked a task (section index item) 
        // // pass callback down to section, then down to section index item to set the state here?
        // const rightComponentToRender; 

        return (
            <div>
                <ul>{sectionItems}</ul>
                <div className="temporaryPlaceholder1-ForDescription">Description: {project.description}</div>
                <div className="temporaryPlaceholder2-ForTaskComponent">conditionally render task show component here</div>
            </div>
        );
    }
}

export default ProjectListView;