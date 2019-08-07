import React from 'react';
import { connect } from 'react-redux';

const SmallUserInfoTooltip = props => {
    const { user, currentTeam, idProp } = props;
    let userName = "";
    if (user && user.fullName) {
        userName = user.fullName;
    } else if (user) {
        userName = user.primaryEmail;
    }

    return (
        <div className="small-user-info-tooltip hidden" id={`avatar-tooltip ${idProp}`}>
            <i className="fas fa-caret-up"></i>
            <h1>{userName}</h1>
            <h2>{currentTeam ? currentTeam.name : ""}</h2>
        </div>
    );
};

const msp = state => {
    const currentTeam = state.ui.currentTeam;
    return { currentTeam };
};

export default connect(msp, null)(SmallUserInfoTooltip);