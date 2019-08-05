import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { TaskIndexItem } from './task_index_item';
import SectionIndexItem from '../sections/section_index_item';
import { selectAllTasks, selectAllProjects } from '../../reducers/selectors';
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
        const { tasks, projects, currentUserId, currentTeam, projectsArr } = this.props;

        let teamProjectIds = [];
        if (currentTeam) {
            projectsArr.forEach(project => {
                if (project.teamId === currentTeam.id) { teamProjectIds.push(project.id); }
            });
        }

        // const userTasks = tasks.filter(task => task.assigneeId === currentUserId);
        // Refactored to only show user's tasks that are associated with current team / workspace
        const userTasks = tasks.filter(task => {
            return task.assigneeId === currentUserId && teamProjectIds.includes(task.projectId);
        });

        // debugger
        const today = new Date();
        let dueSoon = [];

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
                // dueSoon.push(<TaskIndexItem task={task} key={task.id} project={project} />);
                dueSoon.push(<SectionIndexItem task={task} key={task.id}
                    showProject={true} showDate={true} showAssignee={false} />);
            }
        });
        
        const dueTasksClass = dueSoon.length > 0 ? "" : "no-tasks-msg";
        const noTasksMsg = <li className="no-tasks-msg">No tasks due in the next five days</li>;
        // debugger
        return (
            <div className="filtered-task-index-container"> 
                <h2>Tasks Due Soon</h2>
                <ul className={`${dueTasksClass}`}>{dueSoon.length > 0 ? dueSoon : noTasksMsg}</ul>
            </div>
        );
    }
}



const msp = (state) => {
    const tasks = selectAllTasks(state);
    const projects = state.entities.projects;
    const projectsArr = selectAllProjects(state);
    const currentUserId = state.session.id;
    const currentTeam = state.ui.currentTeam;
    return { tasks, projects, currentUserId, currentTeam, projectsArr };
};

const mdp = dispatch => {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
    };
};

export default withRouter(connect(msp, mdp)(FilteredTaskIndex));