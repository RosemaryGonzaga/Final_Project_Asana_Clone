import { RECEIVE_ALL_TASKS, RECEIVE_TASK, REMOVE_TASK } from '../actions/task_actions';
import { merge } from 'lodash';

const tasksReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ALL_TASKS:
            return merge({}, action.tasks);
        case RECEIVE_TASK:
            const { task } = action;
            return merge({}, oldState, { [task.id]: task });
        case REMOVE_TASK:
            const { taskId } = action;
            let newState = merge({}, oldState);
            delete newState[taskId]
            return newState;
        default:
            return oldState;
    }
};

export default tasksReducer;