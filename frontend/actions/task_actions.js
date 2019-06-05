import * as TaskApiUtil from '../util/tasks_api_util';
import { closeModal } from './modal_actions';

// action types
export const RECEIVE_ALL_TASKS = "RECEIVE_ALL_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";


// regular action creators
const receiveAllTasks = tasks => {
    return {
        type: RECEIVE_ALL_TASKS,
        tasks,
    };
};

const receiveTask = task => {
    // debugger
    return {
        type: RECEIVE_TASK,
        task,
    };
};

const removeTask = taskId => {
    return {
        type: REMOVE_TASK,
        taskId,
    };
};


// thunk action creators

export const fetchTasks = () => {
    return dispatch => {
        return TaskApiUtil.fetchTasks()
            .then(payload => dispatch(receiveAllTasks(payload)));
    };
}

export const fetchTask = id => {
    return dispatch => {
        return TaskApiUtil.fetchTask(id)
            .then(payload => dispatch(receiveTask(payload)));
    };
}

export const createTask = task => {
    return dispatch => {
        return TaskApiUtil.createTask(task)
            .then(payload => dispatch(receiveTask(payload)));
    };
}

export const updateTask = task => {
    return dispatch => {
        return TaskApiUtil.updateTask(task)
            .then(payload => {
                dispatch(receiveTask(payload))
                    // dispatch(closeModal())
            });
    };
}

export const deleteTask = id => {
    return dispatch => {
        return TaskApiUtil.deleteTask(id)
            .then(payload => {
                dispatch(removeTask(id))
                    // dispatch(closeModal())
            });
    };
}