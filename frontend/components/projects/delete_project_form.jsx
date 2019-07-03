import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchProject, deleteProject } from '../../actions/project_actions';
import { closeModal } from '../../actions/modal_actions';

class DeleteProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // e.preventDefault(); // remember: preventDefault would stop the Link from routing to '/home/projects'
        const { deleteProject, project } = this.props;
        deleteProject(project.id);
    }

    render() {
        const { closeModal, project} = this.props;
        // debugger
        return (
            <div className="delete-project-container">
                <button className="delete-project-close-btn" onClick={closeModal}>
                    <img src={window.closeButtonHover} alt="x" />
                </button>

                {/* <h1>Delete the '{project.name}' project?</h1> */}
                <h1>Delete the project?</h1>
                <h2>This will delete the project and any associated tasks and sections.</h2>
                {/* <h2>This will delete the project and any unassigned tasks that are only in this project.</h2> */}
                <button className="cancel-delete-project" onClick={closeModal}>Cancel</button>
                <Link to="/home/projects" onClick={this.handleClick}
                        className="delete-project-button" >Delete
                </Link>

            </div>
        );
    }
}

const msp = (state, ownProps) => {
    const currentUserId = state.session.id;
    const { projects } = state.entities;
    const pathParts = ownProps.location.pathname.split("/");
    const projectId = pathParts[pathParts.length - 1];
    // const projectId = ownProps.match.params.projectId;  // params is empty --> need to use same strategy as in Home component's msp (see above line)
    const project = projects[projectId];
    return ({ currentUserId, project });
};

const mdp = dispatch => {
    return {
        deleteProject: id => dispatch(deleteProject(id)),
        closeModal: () => dispatch(closeModal()),
    };
}

export default withRouter(connect(msp, mdp)(DeleteProjectForm));