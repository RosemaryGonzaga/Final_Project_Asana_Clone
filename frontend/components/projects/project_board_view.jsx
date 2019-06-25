import React from 'react';
import ColumnContainer from '../sections/columns/column_container';

class ProjectBoardView extends React.Component {

    constructor(props) {
        super(props);
        // debugger
        this.state = {
            project: this.props.project,    // should we be keeping track of project in local state?
            taskToRenderId: "description",  // when project first renders, display the description box on right
        };
        // this.handleAddSection = this.handleAddSection.bind(this);  // adde this later
    }



    // // This is needed so sections don't get populated in the wrong projects when clicking from one project to another
    // // Also, it fixed the double-click issue!! (before, I needed to double click a task index item to show the task)
    // componentDidUpdate(prevProps, prevState) {
    //     // Only fetch sections if they have changed (compare prevProps w/ current props)...
    //     // ...or if the taskToRenderId has changed (compare prevState w/ current state)...
    //     // ...otherwise you'll be stuck in an infinite loop
    //     // Need to use lodash's isEqual to check for equivalence (instead of ===)
    //     // NOTE: now there's a blip when switching from one project to another ... 
    //     // ...nothing inaccurate but needs to be addressed for smoother UX
    //     const equalProps = isEqual(prevProps.sections, this.props.sections);
    //     const equalState = isEqual(prevState.taskToRenderId, this.state.taskToRenderId); // check this condition to resolve double-click issue
    //     if (!equalProps || !equalState) {
    //         const { fetchSections } = this.props;
    //         fetchSections(this.state.project.id);
    //     }
    // }



    render() {
        // To do once sections / columns are implemented: map over sections (col) and render them in the 'board-cols' div below
        // Render first three sections in the first three divs

        const { project, sections, openEditProjectModal, openDeleteProjectModal } = this.props;
        const columns = sections.map(section => {
            return <ColumnContainer section={section} key={section.id} />;
        });
        // debugger
        return (
            <div className="board-project-wrapper">
                <section className="board-project-header">
                    <div>Show project description</div>
                </section>
                <section className="board-cols">
                    {/* <div className="board-col">To Do</div>
                    <div className="board-col">In Progress</div>
                    <div className="board-col">Done</div> */}
                    {columns}
                </section>
            </div>
        );
    }
}

export default ProjectBoardView;