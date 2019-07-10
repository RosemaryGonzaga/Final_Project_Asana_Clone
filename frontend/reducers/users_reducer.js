import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ALL_USERS, RECEIVE_USER } from '../actions/user_actions';
import { merge } from 'lodash';

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return merge({}, action.users);
        case RECEIVE_CURRENT_USER:
            const { currentUser } = action;
            const newState = merge({}, oldState, { [currentUser.id]: currentUser })
            return newState;
        case RECEIVE_USER:
            const { user } = action;
            return merge({}, oldState, { [user.id]: user });
        default:
            return oldState;
    }
};

export default usersReducer;