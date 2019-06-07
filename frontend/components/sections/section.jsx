import React from 'react';
import { SectionIndexItem } from './section_index_item';
// import ProjectListView from './project_list_view';
// import ProjectBoardView from './project_board_view';
// import { Link } from 'react-router-dom';

class Section extends React.Component {
    constructor(props) {
        super(props);
        // this.handleRedirectToHome = this.handleRedirectToHome.bind(this);
    }

    componentDidMount() {
        const { fetchSection, section, fetchTasks } = this.props;     // need to pass sectionId down from project show
        fetchSection(section.id); 
        fetchTasks();
    }

    // handleRedirectToHome(e) {
    //     // e.preventDefault();
    //     const { receiveNavHeader, receiveMainContent } = this.props;  // may need to add constructor method to bind this event handler
    //     receiveNavHeader("Home");
    //     receiveMainContent("projectIndex");
    // }

    render() {
        const { section, tasks, handleOpenTaskShowClick } = this.props;

        const taskItems = tasks.map(task => {
            if (task.sectionId === section.id) {
                return <SectionIndexItem task={task} key={task.id} section={section} handleOpenTaskShowClick={handleOpenTaskShowClick} />;
            } else {
                return null;
            }
        });

        return (
            <div className="section-container">
                <div className="section-header">{section.name}</div>
                <ul>{taskItems}</ul>
            </div>
        );
    }
}

export default Section;