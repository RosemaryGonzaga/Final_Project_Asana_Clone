import React from 'react';
import { connect } from 'react-redux';
import { deleteTeamMembership } from '../../actions/team_membership_actions';
import { removeUser } from '../../actions/user_actions';
import { openModal } from '../../actions/modal_actions';

class WorkspaceMemberIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            removeMember: false,
        };

        this.toggleRemoveMemberBanner = this.toggleRemoveMemberBanner.bind(this);
        this.submitDeleteMembership = this.submitDeleteMembership.bind(this);
    }

    toggleRemoveMemberBanner(e) {
        const { removeMember } = this.state;
        this.setState({ removeMember: !removeMember });
    }

    submitDeleteMembership(e) {
        e.preventDefault();
        const { currentTeam, currentUserId, user, deleteTeamMembership, removeUser, openModal } = this.props;
        if (user.id === currentUserId) {
            openModal('removeUserFromTeam');
        } else {
            deleteTeamMembership({ teamId: currentTeam.id, userId: user.id })
                .then(() => removeUser(user.id));   // remove user from frontend state
        }
    }

    render() {
        const { user } = this.props;
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
                    <div className="member-settings-remove-member" onClick={this.toggleRemoveMemberBanner}>Remove</div>
                </li>
            );
        } else {
            return (
                <li className="member-settings-index-index-remove-member-banner">
                    <span className="remove-member-banner-warning">Only choose this option if you want to remove {user.primaryEmail} from all tasks.</span>
                    <span className="remove-member-banner-remove-action" onClick={this.submitDeleteMembership}>Remove Access</span>
                    <span className="remove-member-banner-cancel-action" onClick={this.toggleRemoveMemberBanner}>Cancel</span>
                </li>
            );
        }
    }
}


const msp = state => {
    const currentTeam = state.ui.currentTeam;
    const currentUserId = state.session.id;
    return { currentTeam, currentUserId };
};

const mdp = dispatch => {
    return {
        deleteTeamMembership: teamMembership => dispatch(deleteTeamMembership(teamMembership)), // teamMembership has team_id and user_id
        removeUser: userId => dispatch(removeUser(userId)),
        openModal: modal => dispatch(openModal(modal)),
    };
};

export default connect(msp, mdp)(WorkspaceMemberIndexItem);