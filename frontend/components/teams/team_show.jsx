import React from 'react';
import { connect } from 'react-redux';
import { selectAllProjects } from '../../reducers/selectors';
import { NewProjectButton } from '../projects/new_project_button';
import { ProjectIndexItem } from '../projects/project_index_item';

class TeamShow extends React.Component {
    render() {
        const { currentTeam, projects } = this.props;

        let teamProjects = projects.slice();
        let projectItems = null;
        if (currentTeam) {  // only access currentTeam's id if currentTeam is truthy
            teamProjects = projects.filter(project => project.teamId === currentTeam.id);
            projectItems = teamProjects.map(project => {
                return <ProjectIndexItem project={project} key={project.id} size="small"/>;
            });
            const newProjectTile = <NewProjectButton key="newProjBtn" size="small"/>;
            projectItems.unshift(newProjectTile); // add new project button here!
        }

        return (
            <div className="team-show-container">
                {/* <div>{currentTeam ? currentTeam.name : ""} Show Page</div> */}
                <div className="team-show-center">
                    <section className="team-show-left">
                        <form className="team-show-left-top">
                            <div className="team-show-section-header">Description</div>
                            <textarea className="team-show-description"
                                // value={members}
                                // onChange={this.handleChange("members")}
                                placeholder="Click to add team description...">
                            </textarea>
                        </form>
                        <section className="team-show-left-bottom">
                            <div className="team-show-section-header">Members</div>
                        </section>
                    </section>
                    <section className="team-show-right">
                        <div className="team-show-section-header project-header">Projects</div>
                        <ul className="team-show-projects-list">{projectItems}</ul>
                    </section>
                </div>
            </div>
        );
    }
}

const msp = state => {
    const currentTeam = state.ui.currentTeam;
    const projects = selectAllProjects(state);
    return { currentTeam, projects };
};

const mdp = dispatch => {
    return {};
};

export default connect(msp, mdp)(TeamShow);