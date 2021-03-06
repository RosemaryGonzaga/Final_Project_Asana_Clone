import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProject } from '../../actions/project_actions';
import { createSection } from '../../actions/section_actions';
import ProjectDescription from './project_description_form';

class NewProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            layout: "list",
            privacy: "public",
            ownerId: this.props.currentUserId,
            // ADD team_id --> how to get this info?
            // ...track in UI slice of state?
            // ...or add a field in users table that tracks most viewed team / workspace?
            // ...(whichever team / workspace was active when the user last signed out?)
            teamId: this.props.currentTeam.id,
            team: this.props.currentTeam,
            addDescription: false, // not part of project info; testing this as a way to change form height
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSetDescription = this.handleSetDescription.bind(this);
        this.handleAddDescription = this.handleAddDescription.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { createProject, createSection, currentUserId } = this.props;
        const project = this.state;
        createProject(project).then(payload => {
            const { project } = payload;
            const path = `/home/projects/${project.id}`;
            // this.props.history.push(path);
            
            // TO DO: create blank section with projectId
            const blankSection = {
                name: "New Section",
                description: "",
                layout: project.layout,
                projectId: project.id,
                assigneeId: currentUserId,
                dueOn: ""
            };
            // debugger
            createSection(blankSection).then(payload => this.props.history.push(path));
            // this.props.history.push(path);
        });
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleAddDescription() {
        this.setState({ addDescription: true });
    }

    handleSetDescription() {
        return e => {
            this.setState({ description: e.target.value });
        };
    }

    render() {
        const { name, description, layout, privacy, addDescription } = this.state;

        let descriptionText;
        let containerClass = "new-project-form-container";
        if (addDescription) {
            containerClass = "new-project-form-container-expanded";
            descriptionText = (<ProjectDescription description={description} 
                                                    handleSetDescription={this.handleSetDescription} />);
        } else {
            descriptionText = (<p onClick={this.handleAddDescription}
                                    id="description-link">
                                Add a description
                                </p>);
        }

        let disabled = false;
        let projectNameId = "project-name";
        if (name === "") {
            disabled = true;
            projectNameId = "project-name-invalid-input";
        }

        return (
            <div className="new-project-page">
                <Link to="/home/projects" className="arrow-link-to-home">
                    <i className="fas fa-arrow-left"></i>
                </Link>
                
                <Link to="/home/projects" className="x-link-to-home">
                    <img src={window.closeButtonHover} alt="x" />
                </Link>

                <div className={containerClass}>
                    <h1>Add project details</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="new-project-name">
                            <label htmlFor="projectName">Project name</label>
                            <input type="text" value={name} id="projectName" 
                                    onChange={this.handleChange("name")}
                                    id={projectNameId}/>
                        </div>

                        {descriptionText}

                        <div className="new-project-layout">
                            <p>Default view</p>
                                
                            <label htmlFor="list">
                                <input type="radio" name="layout" value="list" id="list"
                                    onChange={this.handleChange("layout")} checked /> List
                            </label>
                        
                            <label htmlFor="board"> 
                            <input type="radio" name="layout" value="board" id="board"
                                onChange={this.handleChange("layout")} /> Board
                            </label>                           
                        </div>

                        <div className="new-project-privacy">
                            <p>Privacy</p>

                            <label htmlFor="public">
                                <input type="radio" name="privacy" value="public" id="public" 
                                        onChange={this.handleChange("privacy")} checked/> Public
                            </label>

                            <label htmlFor="private">
                                <input type="radio" name="privacy" value="private" id="private" 
                                        onChange={this.handleChange("privacy")}/> Private
                            </label>
                        </div>
                        <input type="submit" disabled={disabled} value="Create project"/>
                    </form>
                </div>
            </div>
        );
    }
}


const msp = state => {
    const currentUserId = state.session.id;
    const currentTeam = state.ui.currentTeam;
    return ({ currentUserId, currentTeam });
};

const mdp = dispatch => {
    return {
        createProject: project => dispatch(createProject(project)),
        createSection: section => dispatch(createSection(section)),
    };
}

export default connect(msp, mdp)(NewProjectForm);
// export default withRouter(connect(msp, mdp)(NewProjectForm));