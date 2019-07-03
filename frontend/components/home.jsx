import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/session_actions';
import ProjectIndexContainer from './projects/project_index_container';
import ProjectShowContainer from './projects/project_show_container';
import TaskIndexContainer from './tasks/task_index_container';
import Welcome from './welcome';
// import TaskShowContainer from './tasks/task_show_container';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import { fetchProjects } from '../actions/project_actions';
import { fetchTeams } from '../actions/team_actions';
import { fetchUsers } from '../actions/user_actions';
import { receiveCurrentTeam, resetCurrentTeam } from '../actions/current_team_actions';
// import { receiveMainContent } from '../actions/main_content_actions';
// import { receiveNavHeader } from '../../actions/nav_header_actions';
// import NewProjectForm from './projects/new_project_form';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarClass: "avatar avatar-not-selected",
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleAvatarClick = this.handleAvatarClick.bind(this);
    }

    componentDidMount() {
        // note: this doesn't solve issue of refreshing page on a project show component
        // home component renders before hitting this lifecycle method
        // which means the projects slice of state is empty, so there's nothing to key into when accessing a specific projectId
        // maybe try putting conditional logic in the render method...
        // ...if currentResource.project is undefined, skip that logic until homeComponent has a chance to mount
        // IT WORKED!!!!!!! (see line 47)
        // debugger    

        // this.props.fetchProjects();
        // this.props.fetchTeams();
        const { fetchProjects, fetchTeams, fetchUsers, receiveCurrentTeam } = this.props;
        fetchUsers();
        fetchProjects();
        // debugger
        fetchTeams().then(payload => {
            const teamId = Object.keys(payload.teams);
            const team = payload.teams[teamId];
            // debugger
            receiveCurrentTeam(team);
        });
    }

    handleClick(e) {
        e.preventDefault();
        const { logout, resetCurrentTeam } = this.props;
        logout().then(() => resetCurrentTeam());
        // resetCurrentTeam();
        // logout();
    }

    handleAvatarClick(e) {
        e.preventDefault();
        this.setState({ avatarClass: "avatar avatar-selected" });
        // how do I toggle the class back when a user clicks off the menu? (or selects something from the menu?)
        // is it fair to set a timeout that resets local state? (wouldn't exactly replicate Asana's behavior)
    }

    render() {
        const { currentUser, currentResource, currentTeam } = this.props;
        let initials = currentUser.primaryEmail.slice(0,2).toUpperCase();  // this is temporary --> need to grab initials from user's full name
        let navHeader;
        let layoutIcon;
        let layoutText;
        if (currentResource.component === "home") {
            navHeader = "Home";
        } else if (currentResource.component === "projectIndex") {
            navHeader = "Projects";
        } else if (currentResource.component === "taskIndex") {
            navHeader = "Tasks";
        } else if (currentResource.component === "projectShow" && currentResource.project) {
            navHeader = currentResource.project.name;
            if (currentResource.project.layout === "list") {
                layoutIcon = <i className="fas fa-list"></i>;
                layoutText = (
                    <ul className="topbar-project-views">
                        <li>List</li>
                    </ul>);
            } else if (currentResource.project.layout === "board") {
                layoutIcon = <i className="fab fa-trello"></i>
                layoutText = (
                    <ul className="topbar-project-views">
                        <li>Board</li>
                    </ul>);
            } else {
                layoutIcon = null;
            }
        } else if (currentResource.component === "taskShow" && currentResource.task) {
            // NOTE: this branch has duplicate logic - need to prune / DRY up code later!
            navHeader = currentResource.project.name;
            if (currentResource.project.layout === "list") {
                layoutIcon = <i className="fas fa-list"></i>;
                layoutText = (
                    <ul className="topbar-project-views">
                        <li>List</li>
                    </ul>);
            } else if (currentResource.project.layout === "board") {
                layoutIcon = <i className="fab fa-trello"></i>
                layoutText = (
                    <ul className="topbar-project-views">
                        <li>Board</li>
                    </ul>);
            } else {
                layoutIcon = null;
            }
        } else {    // this condition allows control flow to proceed to componentDidUpdate in case currentResource.project is undefined
            navHeader = ""
        }

        return (
            <div className="home-container">
                <div className="home-sidebar">
                    <Link to="/home"><img src={window.asanaLogoHome}
                            className="home-sidebar-logo"/>
                    </Link>
                    <br/>
                    <ul className="home-sidebar-top">
                        <li><Link to="/home"><i className="fas fa-home"></i> Home</Link></li>
                        <li><Link to="/home/projects"><i className="fas fa-list fa-list-sidebar"></i>Projects</Link></li>
                        <li><Link to="/home/tasks"><i className="far fa-check-circle"></i>Tasks</Link></li>
                        {/* <li><Link to=""><i className="far fa-check-circle"></i>Tasks</Link></li> */}
                    </ul>
                    <ul className="home-sidebar-bottom">
                        {/* <li>{currentTeam === undefined ? null : currentTeam.name}</li> */}
                        <li>{currentTeam ? currentTeam.name : null}</li>
                    </ul>
                    {/* <Link to="/home/projects">Projects Index</Link> */}
                </div>
                <div className="home-main">
                    <div className="home-topbar">
                        <nav className="home-topbar-left">
                           <div className="home-topbar-left-icon">{layoutIcon}</div>
                           <div className="home-topbar-left-navs">
                                <ul className="topbar-project-info">
                                    <li>{navHeader}</li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                {layoutText}
                           </div>
                        </nav>
                        <nav className="home-topbar-right">
                            <ul>
                                {/* <li>Search</li> */}
                                {/* <li>{currentTeam === undefined ? null : currentTeam.name}</li> */}
                                <li className="topbar-new-project-button">
                                    <Link to="/projects/new"><i className="fas fa-plus"></i> New</Link>
                                </li>
                                <li ><button className="random-buttons" onClick={this.handleClick} id="home-logout-btn">Sign Out</button></li>
                                <li className={this.state.avatarClass} onClick={this.handleAvatarClick}>
                                    {initials}
                                </li>
                            </ul>                            
                        </nav>
                    </div>
                    <div className="home-main-content">
                        <Switch>
                            {/* <ProtectedRoute path="/home/projects/:projectId/:taskId" component={TaskShowContainer}/> */}
                            <ProtectedRoute path="/home/projects/:projectId" component={ProjectShowContainer} />
                            <ProtectedRoute path="/home/projects" component={ProjectIndexContainer} />
                            <ProtectedRoute path="/home/tasks" component={TaskIndexContainer} />
                            <ProtectedRoute exact path="/home" component={Welcome} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

const msp = (state, ownProps) => {
    const pathParts = ownProps.location.pathname.split("/");
    const resource = pathParts[pathParts.length - 2];   // Should be either "projects" or "tasks" (if it's blank show home; if it's "home", show projects index )
    const resourceId = pathParts[pathParts.length - 1]; // Should be a number ...
    const projectId = pathParts[pathParts.indexOf("projects") + 1];
    // debugger
    let currentResource;
    if (pathParts.includes("projects") && pathParts.length > 3) {   // added this conditional on 6/26 ... may make other conditionals unnecessary
        currentResource = {
            component: "projectShow",
            project: state.entities.projects[projectId],   // pass current project as a prop
        }
    } else if (resource === "projects") {
        currentResource = {
            component: "projectShow",
            // project: state.entities.projects[resourceId],   // pass current project as a prop
            project: state.entities.projects[projectId],   // pass current project as a prop
        }
    // } else if (resource === "tasks") {
    //     currentResource = {
    //         component: "taskShow",
    //         task: state.entities.tasks[resourceId],      // to flesh out later: pass current task as a prop
    //     }
    } else if (resource === "home" && pathParts.includes("projects")) {
        // debugger
        currentResource = {
            component: "projectIndex",
        }
    } else if (resource === "home" && pathParts.includes("tasks")) {
        // debugger
        currentResource = {
            component: "taskIndex",
        }
    } else if (resource === "") {
        // debugger
        currentResource = {
            component: "home",
        }
    } else if (!isNaN(parseInt(resource))) {    // if resource is a number (but need to catch other scenarios - like "" and "tasks" - upstream)
        // debugger
        currentResource = {
            component: "taskShow",
            task: state.entities.tasks[resourceId],
            project: state.entities.projects[resource]  // in this branch of code, resource is presumably the projectId
        }
    };

    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];

    // // get current user's current team
    // const currentTeamId = Object.keys(state.entities.teams)[0];
    // const currentTeam = state.entities.teams[currentTeamId];
    const currentTeam = state.ui.currentTeam;
    return ({ currentUser, currentResource, currentTeam });
};

const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        fetchProjects: () => dispatch(fetchProjects()),
        fetchTeams: () => dispatch(fetchTeams()),
        fetchUsers: () => dispatch(fetchUsers()),
        receiveCurrentTeam: team => dispatch(receiveCurrentTeam(team)),
        resetCurrentTeam: team => dispatch(resetCurrentTeam(team)),
    });
};

// export default connect(msp, mdp)(Home);
export default withRouter(connect(msp, mdp)(Home));