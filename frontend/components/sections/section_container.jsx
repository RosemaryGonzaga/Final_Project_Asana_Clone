import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Section from './section';
import { fetchSection } from '../../actions/section_actions';
import { fetchTasks } from '../../actions/task_actions';
import { selectAllTasks } from '../../reducers/selectors';
// import { receiveNavHeader } from '../../actions/nav_header_actions';
// import { receiveMainContent } from '../../actions/main_content_actions';
// import { openModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
    // const { sections } = state.entities;
    // // const sectionId = ownProps.match.params.sectionId;
    // const sectionId = ownProps.sectionId;   // need to pass sectionId down from project show
    // const section = sections[sectionId];
    // return { section };

    const tasks = selectAllTasks(state);
    return { tasks };
};

const mdp = dispatch => {
    return {
        fetchSection: id => dispatch(fetchSection(id)),
        fetchTasks: () => dispatch(fetchTasks()),
        // receiveNavHeader: header => dispatch(receiveNavHeader(header)),
        // receiveMainContent: content => dispatch(receiveMainContent(content))
    };
};

export default withRouter(connect(msp, mdp)(Section));