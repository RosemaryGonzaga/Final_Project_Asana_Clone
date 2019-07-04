import { connect } from 'react-redux';
import TeamSidebar from './team_sidebar';
import { receiveCurrentTeam, resetCurrentTeam } from '../../actions/current_team_actions';
import { selectAllUsers, selectAllProjects, selectAllTeams } from '../../reducers/selectors';

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
    };
};

export default connect(msp, mdp)(TeamSidebar);