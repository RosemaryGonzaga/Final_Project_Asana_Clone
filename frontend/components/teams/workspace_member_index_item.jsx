import React from 'react';
import { connect } from 'react-redux';
import { deleteTeamMembership } from '../../actions/team_membership_actions';

class WorkspaceMemberIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            removeMember: false,
        };

        this.toggleRemoveMember = this.toggleRemoveMember.bind(this);
    }

    toggleRemoveMember(e) {
        const { removeMember } = this.state;
        this.setState({ removeMember: !removeMember });
    }

    render() {
        const { user, deleteTeamMembership } = this.props;
        const initials = user.primaryEmail.slice(0, 2).toUpperCase();
        
        if (!this.state.removeMember) {
            return (
                <li className="member-settings-index-item">
                    <div className="member-settings-avatar avatar">{initials}</div>
                    {/* later, replace user.primaryEmail with user.fullName */}
                    <div className="member-settings-full-name">{user.primaryEmail}</div>
                    {/* see note two lines up */}
                    <div className="member-settings-primary-email">{user.primaryEmail}</div>
                    <div className="member-settings-membership-type">Member</div>
                    <div className="member-settings-remove-member" onClick={this.toggleRemoveMember}>Remove</div>
                </li>
            );
        } else {
            return (
                <li className="member-settings-index-index-remove-member-banner">
                    <span className="remove-member-banner-warning">Only choose this option if you want to remove {user.primaryEmail} from all tasks.</span>
                    <span className="remove-member-banner-remove-action">Remove Access</span>
                    <span className="remove-member-banner-cancel-action"onClick={this.toggleRemoveMember}>Cancel</span>
                </li>
            );
        }

        // return (
        //     <li className="member-settings-index-item">
        //         <div className="member-settings-avatar avatar">{initials}</div>
        //         {/* later, replace user.primaryEmail with user.fullName */}
        //         <div className="member-settings-full-name">{user.primaryEmail}</div>
        //         {/* see note two lines up */}
        //         <div className="member-settings-primary-email">{user.primaryEmail}</div>
        //         <div className="member-settings-membership-type">Member</div>
        //         <div className="member-settings-remove-member">Remove</div>
        //     </li>
        // );
    }
}


const msp = state => {
    const currentTeam = state.ui.currentTeam;
    return { currentTeam };
};

const mdp = dispatch => {
    return {
        deleteTeamMembership: teamMembership => dispatch(deleteTeamMembership(teamMembership)), // teamMembership has team_id and user_id
    };
};

export default connect(msp, mdp)(WorkspaceMemberIndexItem);