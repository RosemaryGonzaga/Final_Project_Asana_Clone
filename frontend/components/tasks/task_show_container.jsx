import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskShow from './task_show';
import { fetchTask } from '../../actions/task_actions';

const msp = (state, ownProps) => {
    const { tasks } = state.entities;
    const taskId = ownProps.match.params.taskId;
    const task = tasks[taskId];
    return { task };
};

const mdp = dispatch => {
    return {
        fetchTask: id => dispatch(fetchTask(id)),
    };
};

export default withRouter(connect(msp, mdp)(TaskShow));