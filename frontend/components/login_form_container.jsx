import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../actions/session_actions';

const msp = (state, ownProps) => {
    const { errors } = state;
    return {
        errors,
        formType: "login",
    };
};

const mdp = dispatch => {
    return {
        processForm: user => dispatch(login(user)),
    };
};

export default connect(msp, mdp)(SessionForm);