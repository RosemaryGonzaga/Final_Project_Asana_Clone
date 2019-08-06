import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import AvatarIcon from './avatar_icon';

class AvatarTooltip extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { user, currentUser, tooltipPos, idProp, openModal } = this.props;

        let xPos, yPos;
        if (tooltipPos) [xPos, yPos] = tooltipPos;

        const editProfileBtn = <div className="edit-profile-btn" onClick={() => openModal('openProfileSettings')}>
                <i className="fas fa-pencil-alt"></i>
            </div>;
        const optionalBtn = user && currentUser && user.id === currentUser.id ? editProfileBtn : null;

        const avatar = user && user.photoUrl ? <AvatarIcon photoUrl={user.photoUrl} /> : null;
        
        return (
            <div className={`avatar-tooltip hidden ${xPos} ${yPos}`} id={`avatar-tooltip ${idProp}`} >
                <div className="avatar-tooltip-bridge"></div>
                {optionalBtn}
                <div className="avatar-tooltip-top">{avatar}</div>
                <div className="avatar-tooltip-bottom">
                    <p>{user.fullName ? user.fullName : user.primaryEmail}</p>
                </div>
            </div>
        );
    }
}

const msp = state => {
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    return { currentUser };
}

const mdp = dispatch => {
    return {
        openModal: modal => dispatch(openModal(modal)),
    };
};

export default connect(msp, mdp)(AvatarTooltip);