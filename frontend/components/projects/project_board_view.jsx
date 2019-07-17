import React from 'react';
import ColumnContainer from '../sections/columns/column_container';
import { isEqual } from 'lodash';

class ProjectBoardView extends React.Component {

    constructor(props) {
        super(props);
        // debugger
        this.state = {
            project: this.props.project, // remember, this only runs once, so state needs to be reset if the project changes
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
            // const { fetchSections } = this.props;
            // fetchSections(this.state.project.id);
            this.setState({ project: this.props.project });
            // NOTE: added setState to address bug that occurred when navigating directly
            // from one board project to another. (The previous project's sections and tasks would render
            // instead of those associated with the current project.) The bug occurred b/c a previous implementation
            // would re-fetch sections in componentDidUpdate, but instead what needed to happen was 
            // this component's state needed to be reset. (The local state keeps track of the current project,
            // and w/o resetting local state, the old project info would be rendered instead of the new project info.)
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
                    <button className="random-buttons" onClick={openDeleteProjectModal}>Delete Project</button>
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