import React from 'react';
import { ColumnIndexItem } from './column_index_item';
import { Link } from 'react-router-dom';

class Column extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { fetchSection, section, fetchTasks } = this.props;     // need to pass sectionId down from project show
        fetchSection(section.id);
        fetchTasks();
    }

    render() {
        const { section, tasks, openEditTaskModal } = this.props;

        const taskItems = tasks.map(task => {
            if (task.sectionId === section.id) {
                return <ColumnIndexItem task={task} key={task.id} section={section} openEditTaskModal={openEditTaskModal} />;
            } else {
                return null;
            }
        });

        return (
            <div className="section-container">
                {/* <div className="section-header">{section.name}</div> */}
                <Link to={`/home/projects/${section.projectId}/${section.id}`}      // '/home/projects/:projectId/:taskId'
                    className="section-header"
                    // onClick={handleOpenSectionShowClick(section.id)}
                    id={section.id} >
                    <i className="far fa-check-circle" id="fa-check-circle-task-item"></i>
                    <p>{section.name}</p>
                </Link>
                <ul>{taskItems}</ul>
            </div>
        );
    }
}

export default Column;