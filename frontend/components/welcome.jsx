import React from 'react';
// import { TaskIndexItem } from './task_index_item';
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
                WELCOME TO YOUR PAGE!
            </div>
        );
    }
}

export default Welcome;