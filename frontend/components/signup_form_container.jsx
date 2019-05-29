import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../actions/session_actions';

const msp = (state, ownProps) => {
    const { errors } = state;
    return {
        errors,
        formType: "signup",
    };
};

const mdp = dispatch => {
    return {
        processForm: user => dispatch(signup(user)),
    };
};

export default connect(msp, mdp)(SessionForm);