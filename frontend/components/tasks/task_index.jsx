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
        // const { section, tasks, handleOpenTaskShowClick, handleOpenSectionShowClick } = this.props;
        const { tasks, projects } = this.props;

        const today = new Date();

        const missedTasks = [];
        const todayTasks = [];
        const upcomingTasks = [];
        const laterTasks = [];

        // const taskItems = tasks.map(task => {
        tasks.forEach(task => {
            const project = projects[task.projectId];
            const dueOn = new Date(task.dueOn);
            const dueDate = dueOn.getDate();
            const dueMonth = dueOn.getMonth();
            const dueYear = dueOn.getFullYear();

            const taskDueToday = (dueDate === today.getDate() && 
                                dueMonth === today.getMonth() && 
                                dueYear === today.getFullYear());
            const timeDiff = Date.parse(dueOn) - Date.parse(today);
            // console.log(taskDueToday);

            if (!task.dueOn) {
                // laterTasks.push(task);
                laterTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            } else if (taskDueToday) {
                // todayTasks.push(task);
                todayTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            } else if (timeDiff < 0) {
                // missedTasks.push(task);
                missedTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            } else if (timeDiff > 0 && timeDiff < 432000000) {
                // upcomingTasks.push(task);
                upcomingTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            } else {
                // laterTasks.push(task);
                laterTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
            }

            // return <TaskIndexItem task={task} key={task.id} project={project} />;
        });
        // debugger
        // console.log(missedTasks);
        // console.log(todayTasks);
        // console.log(upcomingTasks);
        // console.log(laterTasks);
        return (
            <div className="task-index-container">
                {/* <ul>{taskItems}</ul> */}

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