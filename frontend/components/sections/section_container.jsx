import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Section from './section';
import { fetchSection } from '../../actions/section_actions';
import { fetchTasks } from '../../actions/task_actions';
import { selectAllTasks } from '../../reducers/selectors';

const msp = (state, ownProps) => {
    const tasks = selectAllTasks(state);
    const pathParts = ownProps.location.pathname.split("/");
    const sectionId = pathParts[pathParts.length - 1];
    return { tasks, sectionId };
};

const mdp = dispatch => {
    return {
        fetchSection: id => dispatch(fetchSection(id)),
        fetchTasks: () => dispatch(fetchTasks()),
    };
};

export default withRouter(connect(msp, mdp)(Section));