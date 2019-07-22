import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ALL_USERS, RECEIVE_USER, REMOVE_USER, REMOVE_ALL_USERS } from '../actions/user_actions';
import { merge } from 'lodash';

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return merge({}, action.users);
        case RECEIVE_CURRENT_USER:
            const { currentUser } = action;
            return merge({}, oldState, { [currentUser.id]: currentUser })
        case RECEIVE_USER:
            const { user } = action;
            return merge({}, oldState, { [user.id]: user });
        case REMOVE_USER:
            const { userId } = action;
            const newState = merge({}, oldState);
            delete newState[userId]
            return newState;
        case REMOVE_ALL_USERS:
            return {};
        default:
            return oldState;
    }
};

export default usersReducer;