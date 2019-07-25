import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskShow from './task_show';
import { fetchTask, updateTask, deleteTask } from '../../actions/task_actions';

const msp = (state, ownProps) => {
    // const { sections, projects, users } = state.entities;
    // const { tasks, sections, projects, users } = state.entities;
    // const taskId = ownProps.match.params.taskId;
    // const task = tasks[taskId];
    // return { task, sections, projects, users };
    // debugger
    const { tasks, sections, projects, users } = state.entities;
    const taskId = ownProps.taskId;
    const task = tasks[taskId];
    const currentUserId = state.session.id;
    const currentUser = users[currentUserId];
    return { task, sections, projects, users, currentUser };
    // return { sections, projects, users };
};

const mdp = dispatch => {
    return {
        fetchTask: id => dispatch(fetchTask(id)),
        updateTask: task => dispatch(updateTask(task)),
        deleteTask: id => dispatch(deleteTask(id)),
    };
};

export default withRouter(connect(msp, mdp)(TaskShow));