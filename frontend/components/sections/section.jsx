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
        // fetchSection(this.props.match.params.projectId);    
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
        // const { project, openEditProjectModal, openDeleteProjectModal } = this.props;
        // const { project } = this.props;
        // console.log(this.props);
        // let layout;
        // if (!project) {
        //     return null;
        // } else if (project.layout === "list") {
        //     layout = <ProjectListView project={project} openEditProjectModal={openEditProjectModal} />;
        // } else {
        //     layout = <ProjectBoardView project={project} openEditProjectModal={openEditProjectModal} />;
        // }

        const { section, tasks } = this.props;

        const taskItems = tasks.map(task => {
            if (task.sectionId === section.id) {
                return <SectionIndexItem task={task} key={task.id} section={section} />;
                // return <div>{task.name}</div>;
            } else {
                return null;
            }
        });

        return (
            <div className="section-container">
                <div>{section.name}</div>
                {taskItems}
                {/* <form>

                </form> */}
            </div>
        );
    }
}

export default Section;