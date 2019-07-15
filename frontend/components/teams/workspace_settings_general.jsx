import React from 'react';
import { connect } from 'react-redux';
import { updateTeam } from '../../actions/team_actions';

class GeneralWorkspaceSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.currentTeam.name,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { updateTeam, currentTeam } = this.props;
        const name = this.state.name;
        updateTeam({ id: currentTeam.id, name });
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    render() {
        const { name } = this.state;
        
        return (
            <div className="general-workspace-settings-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="general-workspace-settings-name">
                        <label htmlFor="GeneralSettingsTeamName">Workspace Name</label>
                        <input type="text" value={name} id="GeneralSettingsTeamName"
                            onChange={this.handleChange("name")} />
                    </div>

                    <input type="submit" value="Update Workspace" />
                </form>
            </div>
        );
    }
}


const msp = state => {
    const currentTeam = state.ui.currentTeam;
    return { currentTeam };
}

const mdp = dispatch => {
    return ({
        updateTeam: team => dispatch(updateTeam(team)),
    });
};

export default connect(msp, mdp)(GeneralWorkspaceSettings);