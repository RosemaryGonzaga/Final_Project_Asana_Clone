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
    }

    render() {
        const { closeModal } = this.props;
        // const { selectedTab } = this.state;
        return (
            <div className="workspace-settings-container">
                <button className="workspace-settings-close-btn" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="workspace-settings-header">
                    <h1>Workspace Settings </h1>
                </div>
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