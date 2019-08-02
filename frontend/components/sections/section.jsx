import React from 'react';
import { SectionIndexItem } from './section_index_item';
// import ProjectListView from './project_list_view';
// import ProjectBoardView from './project_board_view';
import { Link } from 'react-router-dom';

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
        const { section, tasks, handleOpenTaskShowClick, handleOpenSectionShowClick } = this.props;

        const taskItems = tasks.map(task => {
            if (task.sectionId === section.id) {
                return <SectionIndexItem task={task} key={task.id} section={section} handleOpenTaskShowClick={handleOpenTaskShowClick} />;
            } else {
                return null;
            }
        });

        const completionClass = section.completed ? "completed" : "";

        return (
            <div className="section-container">
                {/* <div className="section-header">{section.name}</div> */}
                <Link to={`/home/projects/${section.projectId}/${section.id}`}      // '/home/projects/:projectId/:taskId'
                    className={`section-header ${completionClass}`}
                    onClick={handleOpenSectionShowClick(section.id)}
                    id={section.id} >
                    {/* <div className={`check-task-circle ${completedClass}`}>
                        <i className="fas fa-check task-item"></i>
                    </div> */}
                    <p className={`section-header-text ${completionClass}`}>{section.name}</p>
                </Link>
                <ul className="section-tasks">{taskItems}</ul>
            </div>
        );
    }
}

export default Section;