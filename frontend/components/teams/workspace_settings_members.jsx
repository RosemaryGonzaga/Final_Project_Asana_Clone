import React from 'react';
import { connect } from 'react-redux';
// import { deleteTeamMembership, createTeamMembershipsByEmail } from '../../actions/team_membership_actions';
import { selectAllUsers } from '../../reducers/selectors';
import WorkspaceMemberIndexItem from './workspace_member_index_item';
import InviteMemberForm from './workspace_settings_invite_member_form';

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
            );
        });

        return (
            <div className="member-workspace-settings-container">
                <section className="member-settings-summary">{users.length} of 15 members invited.</section>
                <ul className="member-settings-members">{teamMembers}</ul>
                <section className="member-settings-invite-more">
                    <div className="member-settings-divider"></div>
                    <h1>INVITE MORE MEMBERS</h1>
                    <InviteMemberForm />
                </section>
            </div>
        );
    }
}


const msp = state => {
    // const currentTeam = state.ui.currentTeam;
    const users = selectAllUsers(state);
    return { users };
    // return { currentTeam, users };
};

// const mdp = dispatch => {
//     return {
//         // deleteTeamMembership: teamMembership => dispatch(deleteTeamMembership(teamMembership)), // teamMembership has team_id and user_id
//         // createTeamMembershipsByEmail: data => dispatch(createTeamMembershipsByEmail(data)), // shape of data arg: { teamId: teamId, emails: [email1, email2, email3, ...] }
//     };
// };

// export default connect(msp, mdp)(MemberWorkspaceSettings);
export default connect(msp, null)(MemberWorkspaceSettings);