import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import navHeaderReducer from './nav_header_reducer';
import mainContentReducer from './main_content_reducer';

const uiReducer = combineReducers({
    modal: modalReducer,
    navHeader: navHeaderReducer,
    mainContent: mainContentReducer,
});

export default uiReducer;