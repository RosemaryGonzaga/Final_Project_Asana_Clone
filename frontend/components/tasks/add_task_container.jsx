import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddTask from './add_task';
import { fetchTask, updateTask, deleteTask, createTask } from '../../actions/task_actions';

const msp = (state, ownProps) => {
    // const { sections, projects, users } = state.entities;
    // const { tasks, sections, projects, users } = state.entities;
    // const taskId = ownProps.match.params.taskId;
    // const task = tasks[taskId];
    // return { task, sections, projects, users };
    // debugger
    const { tasks, sections, projects, users } = state.entities;
    const currentUserId = state.session.id;
    const currentUser = users[currentUserId];
    // const taskId = ownProps.taskId;
    // const task = tasks[taskId];
    // return { task, sections, projects, users };
    return { sections, projects, users, currentUser, currentUserId };
};

const mdp = dispatch => {
    return {
        fetchTask: id => dispatch(fetchTask(id)),
        createTask: task => dispatch(createTask(task)),
        deleteTask: id => dispatch(deleteTask(id)),
    };
};

// export default withRouter(connect(msp, mdp)(TaskShow));
export default withRouter(connect(msp, mdp)(AddTask));