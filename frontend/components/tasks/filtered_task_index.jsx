import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TaskIndexItem } from './task_index_item';
import { selectAllTasks } from '../../reducers/selectors';
import { fetchTasks } from '../../actions/task_actions';
// import { Link } from 'react-router-dom';

class FilteredTaskIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Note: need to fetchTasks b/c state.entities.tasks is empty when this component first mounts
        const { fetchTasks } = this.props;
        fetchTasks();
    }

    render() {
        const { tasks, projects, currentUserId } = this.props;
        const userTasks = tasks.filter(task => task.assigneeId === currentUserId);
        // debugger
        const today = new Date();
        const dueSoon = [];

        // tasks.forEach(task => {
        userTasks.forEach(task => {
            const project = projects[task.projectId];
            const dueOn = new Date(task.dueOn);
            const dueDate = dueOn.getDate();
            const dueMonth = dueOn.getMonth();
            const dueYear = dueOn.getFullYear();

            const taskDueToday = (dueDate === today.getDate() &&
                dueMonth === today.getMonth() &&
                dueYear === today.getFullYear());
            const timeDiff = Date.parse(dueOn) - Date.parse(today);

            if (taskDueToday || (timeDiff > 0 && timeDiff < 172800000)) {
                dueSoon.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            }
        });

        // debugger
        return (
            <div className="filtered-task-index-container"> 
                <h2>Tasks Due Soon</h2>
                <ul>{dueSoon}</ul>
            </div>
        );
    }
}



const msp = (state) => {
    const tasks = selectAllTasks(state);
    const projects = state.entities.projects;
    const currentUserId = state.session.id;
    return { tasks, projects, currentUserId };
};

const mdp = dispatch => {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
    };
};

export default withRouter(connect(msp, mdp)(FilteredTaskIndex));