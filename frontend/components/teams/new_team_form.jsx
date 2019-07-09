import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { createTeam } from '../../actions/team_actions';


class NewTeamForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // debugger
        return <div>This is a new team form!</div>;
    }
}

const msp = state => {
    const currentTeam = state.ui.currentTeam;
    // debugger
    return { currentTeam };
}

const mdp = dispatch => {
    return ({
        closeModal: () => dispatch(closeModal()),
        createTeam: team => dispatch(createTeam(team)),
    });
};

export default connect(msp, mdp)(NewTeamForm);