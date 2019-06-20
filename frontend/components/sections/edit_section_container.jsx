import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditSection from './edit_section';
import { fetchSection, updateSection, deleteSection } from '../../actions/section_actions';

const msp = (state, ownProps) => {
    // debugger
    // const { tasks, sections, projects, users } = state.entities;
    // const currentUserId = state.session.id;
    // const currentUser = users[currentUserId];
    // return { sections, projects, users, currentUser, currentUserId };

    const { sections, projects, users } = state.entities;
    const sectionId = ownProps.sectionId;
    const section = sections[sectionId];
    debugger
    return { section, sections, projects, users };
};

const mdp = dispatch => {
    return {
        fetchSection: id => dispatch(fetchSection(id)),
        updateSection: task => dispatch(updateSection(task)),
        deleteSection: id => dispatch(deleteSection(id)),
    };
};

export default withRouter(connect(msp, mdp)(EditSection));