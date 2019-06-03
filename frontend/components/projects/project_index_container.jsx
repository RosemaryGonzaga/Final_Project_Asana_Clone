import { connect } from 'react-redux';
import ProjectIndex from './project_index';
import { fetchProjects } from '../../actions/project_actions';
import { selectAllProjects } from '../../reducers/selectors';
// import React from 'react';

const msp = state => {
    const projects = selectAllProjects(state);
    return { projects };
};

const mdp = dispatch => {
    return {
        fetchProjects: () => dispatch(fetchProjects())
    };
};

export default connect(msp, mdp)(ProjectIndex);