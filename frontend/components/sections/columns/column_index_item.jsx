import React from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { openModal } from '../../../actions/modal_actions';
// import TaskShowContainer from '../tasks/task_show_container';
import { Link } from 'react-router-dom';

export const ColumnIndexItem = props => {

    const { task, openEditTaskModal } = props;
    return (
        <Link to={`/home/projects/${task.projectId}/${task.id}`}      // '/home/projects/:projectId/:taskId'
            className="column-index-item-container"
            // onClick={handleOpenTaskShowClick}
            onClick={openEditTaskModal}
            id={task.id} >
            {/* <i className="far fa-check-circle" id="fa-check-circle-task-item"></i> */}
            <p className="column-index-item-container">{task.name}</p>
        </Link>
    );
};


// const mdp = dispatch => {
//     return {
//         openModal: modal => dispatch(openModal(modal)),
//     };
// };

// export default withRouter(connect(null, mdp)(ColumnIndexItem));