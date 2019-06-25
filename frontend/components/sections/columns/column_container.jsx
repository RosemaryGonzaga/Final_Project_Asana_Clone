import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Column from './column';
import { fetchSection } from '../../../actions/section_actions';
import { fetchTasks } from '../../../actions/task_actions';
import { selectAllTasks } from '../../../reducers/selectors';
import { openModal } from '../../../actions/modal_actions';

const msp = (state, ownProps) => {
    const tasks = selectAllTasks(state);
    return { tasks };
};

const mdp = dispatch => {
    return {
        fetchSection: id => dispatch(fetchSection(id)),
        fetchTasks: () => dispatch(fetchTasks()),
        openEditTaskModal: () => dispatch(openModal('editTask')),
    };
};

export default withRouter(connect(msp, mdp)(Column));