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

        // login button effect
        let disabled = false;
        if (name === "") {
            disabled = true;
        }
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
                            <textarea id="description" 
                                        value={description} id="description"
                                        onChange={this.handleChange("description")}>
                            </textarea>
                        </div>

                        <div className="new-project-layout">
                            {/* <label htmlFor="layout">Default view</label><br /> */}
                            <p>Default view</p>
                                
                            <label htmlFor="list">
                                <input type="radio" name="layout" value="list" id="list"
                                    onChange={this.handleChange("layout")} /> List
                            </label>
                        
                            <label htmlFor="board"> 
                            <input type="radio" name="layout" value="board" id="board"
                                onChange={this.handleChange("layout")} /> Board
                            </label>
                            
                        </div>

                        {/* <div className="new-project-privacy">
                            <label htmlFor="privacy">Default view</label>
                            <input type="radio" name="privacy" value="public" id="privacy" 
                                    onChange={this.handleChange("privacy")}/> Public
                            <input type="radio" name="privacy" value="private" id="privacy" 
                                    onChange={this.handleChange("privacy")}/> Private
                        </div> */}
                        <input type="submit" disabled={disabled} value="Create project"/>
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