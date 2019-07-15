import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { updateTeam } from '../../actions/team_actions';
import { deleteTeamMembership, createTeamMembershipsByEmail } from '../../actions/team_membership_actions';
import { fetchUsers } from '../../actions/user_actions';

class WorkspaceSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "General"
        };

        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab(e) {
        const newState = this.state.selectedTab === "General" ? "Members" : "General";
        this.setState({selectedTab: newState});
    }

    render() {
        const { closeModal } = this.props;
        const { selectedTab } = this.state;
        const generalClass = selectedTab === "General" ? "workspace-settings-general selected-tab" : "workspace-settings-general unselected-tab";
        const membersClass = selectedTab === "Members" ? "workspace-settings-members selected-tab" : "workspace-settings-members unselected-tab";

        const settingsContent = selectedTab === "General" ? <div>General Settings</div> : <div>Member Settings</div>;
        
        return (
            <div className="workspace-settings-container">
                <button className="workspace-settings-close-btn" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="workspace-settings-header">
                    <h1>Workspace Settings </h1>
                    <nav className="workspace-settings-nav">
                        <div className={generalClass} onClick={this.toggleTab}>General</div>
                        <div className={membersClass} onClick={this.toggleTab}>Members</div>
                    </nav>
                </div>
                
                {settingsContent}
            </div>
        );
    }
}

const msp = state => {
    const currentTeam = state.ui.currentTeam;
    const currentUserId = state.session.id;
    return { currentTeam, currentUserId };
}

const mdp = dispatch => {
    return ({
        closeModal: () => dispatch(closeModal()),
        updateTeam: team => dispatch(updateTeam(team)),
        deleteTeamMembership: teamMembership => dispatch(deleteTeamMembership(teamMembership)),
        createTeamMembershipsByEmail: data => dispatch(createTeamMembershipsByEmail(data)),
        fetchUsers: teamId => dispatch(fetchUsers(teamId)),
    });
};

export default connect(msp, mdp)(WorkspaceSettings);