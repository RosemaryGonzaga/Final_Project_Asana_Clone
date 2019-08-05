import React from 'react';
// import { TaskIndexItem } from './task_index_item';
import SectionIndexItem from '../sections/section_index_item';
// import { Link } from 'react-router-dom';

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
        const { tasks, projects, currentUserId, currentTeam, projectsArr } = this.props;

        let teamProjectIds = [];
        if (currentTeam) {
            projectsArr.forEach(project => {
                if (project.teamId === currentTeam.id) teamProjectIds.push(project.id);
            });
        }

        const today = new Date();

        const missedTasks = [];
        const todayTasks = [];
        const upcomingTasks = [];
        const laterTasks = [];

        // const userTasks = tasks.filter(task => task.assigneeId === currentUserId);
        // Refactored to only show user's tasks that are associated with current team / workspace
        const userTasks = tasks.filter(task => {
            return task.assigneeId === currentUserId && teamProjectIds.includes(task.projectId);
        });

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

            const sectionIndexItem = <SectionIndexItem task={task} key={task.id}
                                        showProject={true} showDate={true} showAssignee={false} />;

            if (!task.dueOn) {
                // laterTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
                laterTasks.push(sectionIndexItem);
            } else if (taskDueToday) {
                // todayTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
                todayTasks.push(sectionIndexItem);
            } else if (timeDiff < 0) {
                // missedTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
                missedTasks.push(sectionIndexItem);
            } else if (timeDiff > 0 && timeDiff < 432000000) {
                // upcomingTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
                upcomingTasks.push(sectionIndexItem);
            } else {
                // laterTasks.push(<TaskIndexItem task={task} key={task.id} project={project} />);
                laterTasks.push(sectionIndexItem);
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