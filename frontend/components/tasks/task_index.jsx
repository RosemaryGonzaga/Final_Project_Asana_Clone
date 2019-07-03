import React from 'react';
import { TaskIndexItem } from './task_index_item';
import { Link } from 'react-router-dom';

class TaskIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Note: need to fetchTasks b/c state.entities.tasks is empty when this component first mounts
        const { fetchTasks } = this.props;
        fetchTasks();
    }


    render() {
        const { tasks, projects, currentUserId } = this.props;
        // const { tasks, projects, fetchTasks, fetchProjects } = this.props;

        // // Added the below two conditionals to fix blank page after reloading task index
        // // Not sure if the fix can be attributable to these two lines
        // // ...also added a ternary on line 31 of TaskIndexItem to prevent keying into project if project is undefined
        // if (tasks && tasks.length === 0) { fetchTasks() };
        // if (projects && projects.length === 0) { fetchProjects() };

        const today = new Date();

        const missedTasks = [];
        const todayTasks = [];
        const upcomingTasks = [];
        const laterTasks = [];

        const userTasks = tasks.filter(task => task.assigneeId === currentUserId);

        // tasks.forEach(task => {
        userTasks.forEach(task => {
            const project = projects[task.projectId];
            const dueOn = new Date(task.dueOn);
            const dueDate = dueOn.getDate();
            const dueMonth = dueOn.getMonth();
            const dueYear = dueOn.getFullYear();

            const taskDueToday = (dueDate === today.getDate() && 
                                dueMonth === today.getMonth() && 
                                dueYear === today.getFullYear());
            const timeDiff = Date.parse(dueOn) - Date.parse(today);

            if (!task.dueOn) {
                laterTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            } else if (taskDueToday) {
                todayTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            } else if (timeDiff < 0) {
                missedTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            } else if (timeDiff > 0 && timeDiff < 432000000) {
                upcomingTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            } else {
                laterTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            }
        });
        return (
            <div className="task-index-container">
                <h2>Missed Tasks</h2>
                <ul>{missedTasks}</ul>

                <h2>Today</h2>
                <ul>{todayTasks}</ul>

                <h2>Upcoming</h2>
                <ul>{upcomingTasks}</ul>

                <h2>Later</h2>
                <ul>{laterTasks}</ul>
            </div>
        );
    }
}

export default TaskIndex;