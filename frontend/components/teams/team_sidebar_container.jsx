import { connect } from 'react-redux';
import TeamSidebar from './team_sidebar';
import { receiveCurrentTeam, resetCurrentTeam } from '../../actions/current_team_actions';
import { selectAllUsers, selectAllProjects, selectAllTeams } from '../../reducers/selectors';
import { openModal } from '../../actions/modal_actions';

const msp = state => {
    const currentTeam = state.ui.currentTeam;
    const users = selectAllUsers(state);
    const projects = selectAllProjects(state);
    const teams = selectAllTeams(state);
    return { currentTeam, users, projects, teams };
};

const mdp = dispatch => {
    return {
        receiveCurrentTeam: team => dispatch(receiveCurrentTeam(team)),
        resetCurrentTeam: team => dispatch(resetCurrentTeam(team)),
        openModal: modal => dispatch(openModal(modal)),
    };
};

export default connect(msp, mdp)(TeamSidebar);