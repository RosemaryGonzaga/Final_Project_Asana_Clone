import React from 'react';
import AvatarToken from '../avatars/avatar_token';

export const TeamShowMemberIndexItem = props => {
    const { user, openModal, idx } = props;
    
    if (user === "Add member") {
        return (
            <li className="team-show-member-index-item team-show-add-member-button"
                onClick={() => openModal('editTeamMemberSettings')}>
                <div className="team-show-add-member-icon">
                    <i className="fas fa-plus"></i>
                </div>
                <div className="team-show-add-member-text">{user}</div>
            </li>
        );
    } else if (user === "See all members") {
        return (
            <li className="team-show-member-index-item team-show-see-members-button"
                onClick={() => openModal('editTeamMemberSettings')}>
                <div className="team-show-see-all-members-icon">
                    <i className="fas fa-ellipsis-h"></i>
                </div>
                <div className="team-show-see-all-members-text">{user}</div>
            </li>
        );
    } else {
        // const initials = user.primaryEmail.slice(0, 2).toUpperCase();
        let tooltipPos = ["justify-left", "below"];
        if (idx > 3) tooltipPos[1] = "above";
        return (
            <li className="team-show-member-index-item">
                <AvatarToken user={user} size="large" idProp={`team-show-avatar-${user.id}`}
                    tooltip="standard" tooltipPos={tooltipPos} />
                {/* <div className="team-show-member-avatar"></div> */}
                {/* <div className="team-show-member-avatar avatar">{initials}</div> */}
                <div className="team-show-member-text">
                    {/* later, replace user.primaryEmail with user.fullName */}
                    <div className="team-show-member-full-name">{user.primaryEmail}</div>
                    {/* see note two lines up */}
                    <div className="team-show-member-primary-email">{user.primaryEmail}</div>
                </div>
            </li>
        );
    }
};