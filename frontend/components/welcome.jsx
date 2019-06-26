import React from 'react';
import TaskIndexContainer from './tasks/task_index_container';
import ProjectIndexContainer from './projects/project_index_container';
// import { Link } from 'react-router-dom';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     // Note: need to fetchTasks b/c state.entities.tasks is empty when this component first mounts
    //     const { fetchTasks } = this.props;
    //     fetchTasks();
    // }


    render() {
        
        // debugger
        return (
            <div className="welcome-container">
                {/* <TaskIndexContainer /> */}
                <ProjectIndexContainer />
            </div>
        );
    }
}

export default Welcome;