import React from 'react';
import SectionContainer from '../sections/section_container';

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

        return (
            <div>
                {/* <h1>Name: {project.name}</h1>
                <div>Description: {project.description}</div>
                <div>Layout: {project.layout}</div> */}
                {sectionItems}
            </div>
        );
    }
}

export default ProjectListView;