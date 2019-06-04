import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchProject, deleteProject } from '../../actions/project_actions';
import { closeModal } from '../../actions/modal_actions';

class DeleteProjectForm extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     id: this.props.project.id,
        //     name: this.props.project.name,
        //     description: this.props.project.description,
        // };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { fetchProject } = this.props;
        fetchProject(this.props.match.params.projectId);
    }

    handleClick(e) {
        e.preventDefault();
        const { deleteProject, project } = this.props;
        deleteProject(project.id);
    }

    // handleChange(field) {
    //     return e => {
    //         this.setState({ [field]: e.target.value });
    //     };
    // }

    render() {
        const { closeModal, project } = this.props;
        // const { name, description } = this.state;
        return (
            <div className="edit-project-page">
                <button className="close-btn" onClick={closeModal}>
                    <img src={window.closeButtonHover} alt="x" />
                </button>

                <h1>Delete the '{project.name}' project?</h1>
                <h2>This will delete the project and any unassigned tasks that are only in this project.</h2>
                <button onClick={closeModal}>Cancel</button>
                <Link to="/home/projects" onClick={this.handleClick}>Delete</Link>

                {/* <form onSubmit={this.handleSubmit}>
                    <div className="edit-project-name">
                        <label htmlFor="editProjectName">Project name</label>
                        <input type="text" value={name} id="editProjectName"
                            onChange={this.handleChange("name")} />
                    </div>

                    <div className="new-project-description">
                        <label htmlFor="editDescription">Description</label>
                        <textarea id="editDescription"
                            value={description}
                            onChange={this.handleChange("description")}>
                        </textarea>
                    </div>

                    <input type="submit" value="Update Project" />
                </form> */}

            </div>
        );
    }
}

const msp = (state, ownProps) => {
    debugger
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
        fetchProject: id => dispatch(fetchProject(id)),
        deleteProject: id => dispatch(deleteProject(id)),
        closeModal: () => dispatch(closeModal()),
    };
}

export default withRouter(connect(msp, mdp)(DeleteProjectForm));