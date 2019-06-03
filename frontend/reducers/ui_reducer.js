import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import navHeaderReducer from './nav_header_reducer';

const uiReducer = combineReducers({
    modal: modalReducer,
    navHeader: navHeaderReducer,
});

export default uiReducer;