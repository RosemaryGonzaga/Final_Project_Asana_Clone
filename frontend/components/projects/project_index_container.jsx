import { connect } from 'react-redux';
import ProjectIndex from './project_index';
import { fetchProjects } from '../../actions/project_actions';
import { selectAllProjects } from '../../reducers/selectors';
import { receiveNavHeader } from '../../actions/nav_header_actions';
import { receiveMainContent } from '../../actions/main_content_actions';
// import React from 'react';

const msp = state => {
    const projects = selectAllProjects(state);
    const currentTeam = state.ui.currentTeam;
    debugger
    return { projects, currentTeam };
};

const mdp = dispatch => {
    return {
        fetchProjects: () => dispatch(fetchProjects()),
        receiveNavHeader: header => dispatch(receiveNavHeader(header)),
        receiveMainContent: content => dispatch(receiveMainContent(content)),
    };
};

export default connect(msp, mdp)(ProjectIndex);