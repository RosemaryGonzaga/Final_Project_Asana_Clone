import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskIndex from './task_index';
// import { fetchSection } from '../../actions/section_actions';
import { fetchTasks } from '../../actions/task_actions';
import { selectAllTasks, selectAllProjects } from '../../reducers/selectors';
// import { fetchProjects } from '../../actions/project_actions';
// import { selectAllProjects } from '../../reducers/selectors';
// import { receiveNavHeader } from '../../actions/nav_header_actions';
// import { receiveMainContent } from '../../actions/main_content_actions';

const msp = (state, ownProps) => {
    // debugger
    const tasks = selectAllTasks(state);
    // const projects = selectAllProjects(state);
    const projects = state.entities.projects;
    return { tasks, projects };
};

const mdp = dispatch => {
    return {
        // fetchSection: id => dispatch(fetchSection(id)),
        fetchTasks: () => dispatch(fetchTasks()),
        // fetchProjects: () => dispatch(fetchProjects()),
        // receiveNavHeader: header => dispatch(receiveNavHeader(header)),
        // receiveMainContent: content => dispatch(receiveMainContent(content)),
    };
};

export default withRouter(connect(msp, mdp)(TaskIndex));