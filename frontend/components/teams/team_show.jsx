import React from 'react';
import { connect } from 'react-redux';
import { selectAllUsers, selectAllProjects } from '../../reducers/selectors';
import { TeamShowMemberIndexItem } from './team_show_member_index_item';
import { NewProjectButton } from '../projects/new_project_button';
import { ProjectIndexItem } from '../projects/project_index_item';
import { openModal } from '../../actions/modal_actions';
import { updateTeam } from '../../actions/team_actions';
import debounce from '../../util/debounce_util';

class TeamShow extends React.Component {
    constructor(props) {
        super(props);
        const { currentTeam } = this.props;
        const description = currentTeam ? currentTeam.description : "";
        this.state = { description };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(_, prevState) {
        if (prevState !== this.state) {
            const { currentTeam, updateTeam } = this.props;
            const updatedTeamParams = { id: currentTeam.id, description: this.state.description };
            debounce(() => updateTeam(updatedTeamParams), 2000, false)();
            // updateTeam(updatedTeamParams);
        }
    }

    handleChange(e) {
        this.setState({ description: e.target.value });
    }

    render() {
        const { currentTeam, users, projects, openModal } = this.props;
        const { description } = this.state;

        let teamMembers = users.map(user => {
            return (
                <TeamShowMemberIndexItem key={user.id} user={user} />
            );
        });

        teamMembers.unshift(<TeamShowMemberIndexItem key="Add member" user="Add member" openModal={openModal} />)
        teamMembers.push(<TeamShowMemberIndexItem key="See all members" user="See all members" openModal={openModal} />)

        let teamProjects = projects.slice();
        let projectItems = null;
        if (currentTeam) {
            teamProjects = projects.filter(project => project.teamId === currentTeam.id);
            projectItems = teamProjects.map(project => {
                return <ProjectIndexItem project={project} key={project.id} size="small"/>;
            });
            const newProjectTile = <NewProjectButton key="newProjBtn" size="small"/>;
            projectItems.unshift(newProjectTile); 
        }

        return (
            <div className="team-show-container">
                <div className="team-show-center">
                    <section className="team-show-left">
                        <form className="team-show-left-top">
                            <div className="team-show-section-header">Description</div>
                            <textarea className="team-show-description"
                                value={description}
                                onChange={this.handleChange}
                                placeholder="Click to add team description...">
                            </textarea>
                        </form>
                        <section className="team-show-left-bottom">
                            <div className="team-show-section-header">Members</div>
                            <ul className="team-show-members">{teamMembers}</ul>
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
    const users = selectAllUsers(state);
    const projects = selectAllProjects(state);
    return { currentTeam, users, projects };
};

const mdp = dispatch => {
    return {
        openModal: modal => dispatch(openModal(modal)),
        updateTeam: team => dispatch(updateTeam(team)),
    };
};

export default connect(msp, mdp)(TeamShow);