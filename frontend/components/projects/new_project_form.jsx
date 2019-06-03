import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProject } from '../../actions/project_actions';

class NewProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            layout: "",
            privacy: "",
            ownerId: this.props.currentUserId,
        };

        // bind event handlers
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault;
        const { createProject } = this.props;
        const project = this.state;
        createProject(project);
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    render() {
        const { name, description, layout, privacy } = this.state;
        return (
            <div className="new-project-page">
                <Link to="/" className="arrow-link-to-home">
                    arrow
                </Link>
                
                <Link to="/" className="x-link-to-home">
                    <img src={window.closeButtonHover} alt="x" />
                </Link>

                <div className="new-project-form-container">
                    <h1>Add project details</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="new-project-name">
                            <label htmlFor="projectName">Project name</label>
                            <input type="text" value={name} id="projectName" 
                                    onChange={this.handleChange("name")}/>
                        </div>
                        <div className="new-project-description">
                            <label htmlFor="description">Description</label>
                            <input type="text" value={description} id="description" 
                                    onChange={this.handleChange("description")} />
                            {/* <textarea id="description" cols="30" rows="10">{description}</textarea> */}
                        </div>
                        <div className="new-project-layout">
                            <label htmlFor="layout">Default view</label><br />
                            <input type="radio" name="layout" value="list" id="layout" 
                                    onChange={this.handleChange("layout")}/> List<br />
                            <input type="radio" name="layout" value="board" id="layout" 
                                    onChange={this.handleChange("layout")}/> Board<br />
                        </div>
                        <div className="new-project-privacy">
                            <label htmlFor="privacy">Default view</label><br />
                            <input type="radio" name="privacy" value="public" id="privacy" 
                                    onChange={this.handleChange("privacy")}/> Public<br />
                            <input type="radio" name="privacy" value="private" id="privacy" 
                                    onChange={this.handleChange("privacy")}/> Private<br />
                        </div>
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}


const msp = state => {
    const currentUserId = state.session.id;
    return ({ currentUserId });
};

const mdp = dispatch => {
    return {
        createProject: project => dispatch(createProject(project))
    };
}

export default connect(msp, mdp)(NewProjectForm);