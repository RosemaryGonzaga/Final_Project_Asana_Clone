import React from 'react';
import { connect } from 'react-redux';

class TeamShow extends React.Component {
    render() {
        const { currentTeam } = this.props;
        return (
            <div>{currentTeam ? currentTeam.name : ""} Show Page</div>
        );
    }
}

const msp = state => {
    const currentTeam = state.ui.currentTeam;
    return { currentTeam };
};

const mdp = dispatch => {
    return {};
};

export default connect(msp, mdp)(TeamShow);