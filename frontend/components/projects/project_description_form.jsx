import React from 'react';

class ProjectDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { description, handleSetDescription } = this.props;
        return (
            <div className="new-project-description">
                <label htmlFor="description">Description</label>
                <textarea id="description"
                    value={description} id="description"
                    // onChange={this.handleChange("description")}
                    onChange={handleSetDescription()}
                    >
                </textarea>
            </div>
        );
    }
}

export default ProjectDescription;