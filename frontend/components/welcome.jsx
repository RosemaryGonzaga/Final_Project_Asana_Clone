import React from 'react';
import ProjectIndexContainer from './projects/project_index_container';
import FilteredTaskIndex from './tasks/filtered_task_index';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="welcome-container">
                <FilteredTaskIndex />
                <div className="welcome-project-header">
                    <p>Recent Projects</p>
                </div>
                <ProjectIndexContainer />
                {/* <div className="welcome-project-index-container">
                    <ProjectIndexContainer />
                </div> */}
            </div>
        );
    }
}

export default Welcome;