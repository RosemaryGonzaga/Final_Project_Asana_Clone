import React from 'react';
// import { Link } from 'react-router-dom';

class TaskShow extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     name: "",
        //     description: "",
        //     projectId: "",
        //     sectionId: "",
        //     assigneeId: "",
        //     dueOn: new Date(),
        //     completed: "public",
        //     completedAt: this.props.currentUserId

        // };

        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { fetchTask } = this.props;
        fetchTask(this.props.match.params.taskId);
    }


    handleSubmit(e) {
        // e.preventDefault();
        // const { createProject } = this.props;
        // const project = this.state;
        // createProject(project).then(payload => {
        //     const { project } = payload;
        //     const path = `/home/projects/${project.id}`;
        //     this.props.history.push(path);
        // });
    }

    handleChange(field) {
        // return e => {
        //     this.setState({ [field]: e.target.value });
        // };
    }

    handleMarkComplete(e) {

    }

    render() {

        const { task, sections, projects } = this.props;
        const { id, name, description, projectId, 
                sectionId, assigneeId, dueOn, 
                completed, completedAt, 
                createdAt, updatedAt } = task;
        const section = sections[sectionId];
        const project = projects[projectId];

        return (
            <div className="task-show-container">
                {task.name}
                <form className="task-show-form" onSubmit={this.handleSubmit}>
                    <h1>
                        <button>Mark Complete</button>
                        <button>Close</button>
                    </h1>
                    <section>section 1
                        <p>{name}</p>
                        <p>{assigneeId}</p>
                        <p>{dueOn}</p>
                    </section>
                    <section>section 2
                        <p>{description}</p>
                        <p>{project.name}</p>
                        <p>{section.name}</p>
                    </section>
                    <section>section 3
                        <p>Created at {createdAt}</p>
                        <p>Created at {updatedAt}</p>
                        <p>Completed? {completed.toString()}</p>
                    </section>
                </form>
            </div>
        );
    }
}

export default TaskShow;


