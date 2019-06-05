import React from 'react';
// import { Link } from 'react-router-dom';

class TaskShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { fetchTask } = this.props;
        fetchTask(this.props.match.params.taskId);
    }

    render() {

        const { task } = this.props;
        return (
            <div className="task-show-container">
                {task.name}
            </div>
        );
    }
}

export default TaskShow;