import React from 'react';
import { connect } from 'react-redux';
import { deleteTeamMembership, createTeamMembershipsByEmail } from '../../actions/team_membership_actions';
import { selectAllUsers } from '../../reducers/selectors';
import WorkspaceMemberIndexItem from './workspace_member_index_item';

class MemberWorkspaceSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const { currentTeam, users } = this.props;
        const { users } = this.props;

        let teamMembers = users.map(user => {
            // const initials = user.primaryEmail.slice(0, 2).toUpperCase();
            
            return (
                <WorkspaceMemberIndexItem key={user.id} user={user}/>

                // <li key={user.id} className="member-settings-index-item">
                //     <div className="member-settings-avatar avatar">{initials}</div>
                //     {/* later, replace user.primaryEmail with user.fullName */}
                //     <div className="member-settings-full-name">{user.primaryEmail}</div>
                //     {/* see note two lines up */}
                //     <div className="member-settings-primary-email">{user.primaryEmail}</div>
                //     <div className="member-settings-membership-type">Member</div>
                //     <div className="member-settings-remove-member">Remove</div>
                // </li>
            );
        });

        return (
            <div className="member-workspace-settings-container">
                <section className="member-settings-summary">{users.length} of 15 members invited.</section>
                <ul className="member-settings-members">{teamMembers}</ul>
                <section className="member-settings-invite-more">invite</section>
            </div>
        );
    }
}


const msp = state => {
    const currentTeam = state.ui.currentTeam;
    const users = selectAllUsers(state);
    return { currentTeam, users };
};

const mdp = dispatch => {
    return {
        // deleteTeamMembership: teamMembership => dispatch(deleteTeamMembership(teamMembership)), // teamMembership has team_id and user_id
        createTeamMembershipsByEmail: data => dispatch(createTeamMembershipsByEmail(data)), // shape of data arg: { teamId: teamId, emails: [email1, email2, email3, ...] }
    };
};

export default connect(msp, mdp)(MemberWorkspaceSettings);