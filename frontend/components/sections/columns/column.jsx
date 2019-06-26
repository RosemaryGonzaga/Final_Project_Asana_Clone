import React from 'react';
import { ColumnIndexItem } from './column_index_item';
import { Link } from 'react-router-dom';

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.section.id,
            name: this.props.section.name,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { fetchSection, section, fetchTasks } = this.props;     // need to pass sectionId down from project show
        fetchSection(section.id);
        fetchTasks();
    }



    handleSubmit(e) {
        e.preventDefault();
        const { updateSection } = this.props;
        const section = this.state;
        // debugger
        updateSection(section);
    }

    handleChange(field) {
        // debugger
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }



    render() {
        const { section, tasks, openEditTaskModal } = this.props;

        const taskItems = tasks.map(task => {
            if (task.sectionId === section.id) {
                return <ColumnIndexItem task={task} key={task.id} 
                                        section={section} 
                                        openEditTaskModal={openEditTaskModal} />;
            } else {
                return null;
            }
        });

        return (
            <div className="board-col">
                <form onSubmit={this.handleSubmit}>
                    <input className="column-name-input" type="text" 
                            value={this.state.name} 
                            onChange={this.handleChange("name")}/>
                </form>
                <div className="add-task-to-col-btn"><i className="fas fa-plus"></i></div>
                <ul>{taskItems}</ul>
            </div>
        );
    }
}

export default Column;