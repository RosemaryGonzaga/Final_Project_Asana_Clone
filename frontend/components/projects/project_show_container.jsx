import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProjectShow from './project_show';
import { fetchProject } from '../../actions/project_actions';
import { receiveNavHeader } from '../../actions/nav_header_actions';
import { receiveMainContent } from '../../actions/main_content_actions';
import { openModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
    // debugger
    const { projects } = state.entities;
    const projectId = ownProps.match.params.projectId; // is this right?
    const project = projects[projectId];
    return { project };
};

const mdp = dispatch => {
    // debugger
    return {
        fetchProject: id => dispatch(fetchProject(id)),
        receiveNavHeader: header => dispatch(receiveNavHeader(header)),
        receiveMainContent: content => dispatch(receiveMainContent(content)),
        openEditProjectModal: () => dispatch(openModal('editProject')),
        openDeleteProjectModal: () => dispatch(openModal('deleteProject')),
    };
};

export default withRouter(connect(msp, mdp)(ProjectShow));
// export default connect(msp, mdp)(ProjectShow);