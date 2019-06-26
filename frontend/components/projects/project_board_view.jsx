import React from 'react';
import ColumnContainer from '../sections/columns/column_container';
import { isEqual } from 'lodash';

class ProjectBoardView extends React.Component {

    constructor(props) {
        super(props);
        // debugger
        this.state = {
            project: this.props.project,
        };
        this.handleAddColumn = this.handleAddColumn.bind(this);  // adde this later
    }

    // This is needed so sections don't get populated in the wrong projects when clicking from one project to another
    componentDidUpdate(prevProps, prevState) {
        // Only fetch sections if they have changed (compare prevProps w/ current props)...
        // ...otherwise you'll be stuck in an infinite loop
        // Need to use lodash's isEqual to check for equivalence (instead of ===)
        // NOTE: now there's a blip when switching from one project to another ... 
        // ...nothing inaccurate but needs to be addressed for smoother UX
        if (!isEqual(prevProps.sections, this.props.sections)) {
            const { fetchSections } = this.props;
            fetchSections(this.state.project.id);
        }
    }

    handleAddColumn(e) {
        e.preventDefault();
        // debugger
        const blankColumn = {
            name: "New Column",
            description: "",
            layout: this.props.project.layout,
            projectId: this.props.project.id,
            assigneeId: this.props.currentUserId,
            dueOn: ""
        };

        const { createSection } = this.props;
        createSection(blankColumn);
    }



    render() {
        // To do once sections / columns are implemented: map over sections (col) and render them in the 'board-cols' div below

        const { project, sections, openEditProjectModal, openDeleteProjectModal } = this.props;
        const columns = sections.map(section => {
            return <ColumnContainer section={section} key={section.id} />;
        });
        // debugger
        return (
            <div className="board-project-wrapper">
                <section className="board-project-header">
                    <div>Show Project Description</div>
                </section>
                <section className="board-cols">
                    {/* <div className="board-col">To Do</div>
                    <div className="board-col">In Progress</div>
                    <div className="board-col">Done</div> */}
                    {columns}
                    <a href="#" className="add-column-container" onClick={this.handleAddColumn}><i className="fas fa-plus"></i>Add column</a>
                </section>
            </div>
        );
    }
}

export default ProjectBoardView;