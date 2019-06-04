import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchProject, updateProject } from '../../actions/project_actions';
import { closeModal } from '../../actions/modal_actions';


class EditProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.project.id,
            name: this.props.project.name,
            description: this.props.project.description,
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { fetchProject } = this.props;
        fetchProject(this.props.match.params.projectId);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { updateProject } = this.props;
        updateProject(this.state);
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    render() {
        const { project, closeModal } = this.props;
        return (
            <div className="edit-project-page">
                <button className="close-btn" onClick={closeModal}>
                    <img src={window.closeButtonHover} alt="x" />
                </button>

                <h1>Edit {project.name}</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="edit-project-name">
                        <label htmlFor="editProjectName">Project name</label>
                        <input type="text" value={name} id="editProjectName"
                            onChange={this.handleChange("name")} />
                    </div>

                    {descriptionText}

                    <div className="new-project-description">
                        <label htmlFor="editDescription">Description</label>
                        <textarea id="editDescription"
                            value={description}
                            onChange={this.handleChange("description")}>
                        </textarea>
                    </div>
                    
                    <input type="submit" value="Update Project" />
                </form>
                
            </div>
        );
    }
}

const msp = (state, ownProps) => {
    // debugger
    const currentUserId = state.session.id;
    const { projects } = state.entities;
    const projectId = ownProps.match.params.projectId;  // params is empty, yet the url has the project id in it --> why?
    const project = projects[projectId];
    return ({ currentUserId, project });
};

const mdp = dispatch => {
    return {
        fetchProject: id => dispatch(fetchProject(id)),
        updateProject: project => dispatch(updateProject(project)),
        closeModal: () => dispatch(closeModal()),
    };
}

export default withRouter(connect(msp, mdp)(EditProjectForm));