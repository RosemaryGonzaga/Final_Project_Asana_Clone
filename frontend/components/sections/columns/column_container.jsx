import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Column from './column';
import { fetchSection, updateSection } from '../../../actions/section_actions';
import { fetchTasks, createTask } from '../../../actions/task_actions';
import { selectAllTasks } from '../../../reducers/selectors';
import { openModal } from '../../../actions/modal_actions';

const msp = (state, ownProps) => {
    // debugger
    const tasks = selectAllTasks(state);
    const currentUserId = state.session.id;
    return { tasks, currentUserId };
};

const mdp = dispatch => {
    return {
        fetchSection: id => dispatch(fetchSection(id)),
        updateSection: section => dispatch(updateSection(section)),
        fetchTasks: () => dispatch(fetchTasks()),
        createTask: task => dispatch(createTask(task)),
        openEditTaskModal: () => dispatch(openModal('editTask')),
    };
};

export default withRouter(connect(msp, mdp)(Column));