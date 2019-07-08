import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { receiveCurrentTeam, resetCurrentTeam } from '../../actions/current_team_actions';

const AvatarDropdown = props => {
    const { closeAvatarDropdown, logout, resetCurrentTeam } = props;

    const moreOptionsDropdown = <div className="more-options-dropdown-menu-hidden" id="more-options-dropdown-menu">
                                </div>;

    const displayMoreOptionsDropdown = () => {
        const avatarDropdown = document.getElementById("more-options-dropdown-menu")
        avatarDropdown.className = "more-options-dropdown-menu";
    };

    const hideMoreOptionsDropdown = () => {
        const avatarDropdown = document.getElementById("more-options-dropdown-menu")
        avatarDropdown.className = "more-options-dropdown-menu-hidden";
    };

    const handleLogoutClick = (e) => {
        e.preventDefault();
        closeAvatarDropdown(e);
        logout().then(() => resetCurrentTeam());
    };

    return (
        <div className="avatar-dropdown-menu-hidden" id="avatar-dropdown-menu">
            <section>
                <div onClick={closeAvatarDropdown}>Team 1</div>
            </section>
            <section>
                <div onClick={closeAvatarDropdown}>Workspace Settings...</div>
                <div className="more-options-dropdown-parent" 
                        onClick={closeAvatarDropdown} 
                        onMouseEnter={displayMoreOptionsDropdown}
                        onMouseLeave={hideMoreOptionsDropdown}>
                    More
                    {moreOptionsDropdown}
                </div>
            </section>
            <section>
                <div onClick={closeAvatarDropdown}>My Profile Settings...</div>
                <div onClick={handleLogoutClick}>Log Out</div>
            </section>
        </div>
    );
};

// class AvatarDropdown extends React.Component {
//     render() {
//         const { closeAvatarDropdown } = this.props;
        
//         return (
//             <div className="avatar-dropdown-menu-hidden" id="avatar-dropdown-menu">
//                 <section>
//                     <div onClick={closeAvatarDropdown}>Team 1</div>
//                 </section>
//                 <section>
//                     <div onClick={closeAvatarDropdown}>Workspace Settings...</div>
//                     <div onClick={closeAvatarDropdown}>More</div>
//                 </section>
//                 <section>
//                     <div onClick={closeAvatarDropdown}>My Profile Settings...</div>
//                     <div onClick={closeAvatarDropdown}>Log Out</div>
//                 </section>
//             </div>
//         );
//     }
// }


const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        // receiveCurrentTeam: team => dispatch(receiveCurrentTeam(team)),
        resetCurrentTeam: team => dispatch(resetCurrentTeam(team)),
    });
};

export default connect(null, mdp)(AvatarDropdown);