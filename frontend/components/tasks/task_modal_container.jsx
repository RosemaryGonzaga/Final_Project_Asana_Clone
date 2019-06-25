import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskModal from './task_modal';
import { fetchTask, updateTask, deleteTask } from '../../actions/task_actions';
// import { openModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
    // debugger
    const { tasks, sections, projects, users } = state.entities;
    // const taskId = ownProps.taskId;
    // const task = tasks[taskId];

    const pathParts = ownProps.location.pathname.split("/");
    const taskId = pathParts[pathParts.indexOf("projects") + 2];
    const task = tasks[taskId];

    // debugger
    return { task, sections, projects, users, taskId };
};

const mdp = dispatch => {
    return {
        fetchTask: id => dispatch(fetchTask(id)),
        updateTask: task => dispatch(updateTask(task)),
        deleteTask: id => dispatch(deleteTask(id)),
        // openModal: modal => dispatch(openModal(modal)),
    };
};

export default withRouter(connect(msp, mdp)(TaskModal));