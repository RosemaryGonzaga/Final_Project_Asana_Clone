import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import navHeaderReducer from './nav_header_reducer';
import mainContentReducer from './main_content_reducer';
import currentTeamReducer from './current_team_reducer';

const uiReducer = combineReducers({
    modal: modalReducer,
    navHeader: navHeaderReducer,
    mainContent: mainContentReducer,
    currentTeam: currentTeamReducer,
});

export default uiReducer;