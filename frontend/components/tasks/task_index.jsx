import React from 'react';
import { TaskIndexItem } from './task_index_item';
import { Link } from 'react-router-dom';

class TaskIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Note: need to fetchTasks b/c state.entities.tasks is empty when this component first mounts
        const { fetchTasks } = this.props;
        fetchTasks();
    }


    render() {
        // const { section, tasks, handleOpenTaskShowClick, handleOpenSectionShowClick } = this.props;
        const { tasks, projects } = this.props;

        const taskItems = tasks.map(task => {
            const project = projects[task.projectId];
            return <TaskIndexItem task={task} key={task.id} project={project} />;
        });
        // debugger
        return (
            <div className="task-index-container">
                <ul>{taskItems}</ul>
            </div>
        );
    }
}

export default TaskIndex;