import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/session_actions';
import ProjectIndexContainer from './projects/project_index_container';
import ProjectShowContainer from './projects/project_show_container';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import { fetchProjects } from '../actions/project_actions';
// import { receiveMainContent } from '../actions/main_content_actions';
// import { receiveNavHeader } from '../../actions/nav_header_actions';
// import NewProjectForm from './projects/new_project_form';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // note: this doesn't solve issue of refreshing page on a project show component
        // home component renders before hitting this lifecycle method
        // which means the projects slice of state is empty, so there's nothing to key into when accessing a specific projectId
        // maybe try putting conditional logic in the render method...
        // ...if currentResource.project is undefined, skip that logic until homeComponent has a chance to mount
        // IT WORKED!!!!!!! (see line 47)
        // debugger    
        this.props.fetchProjects();
    }

    handleClick(e) {
        e.preventDefault();
        const { logout } = this.props;
        logout()
    }

    render() {
        // debugger
        const { currentUser, currentResource } = this.props;
        let navHeader;
        if (currentResource.component === "home") {
            navHeader = "Home";
        } else if (currentResource.component === "projectIndex") {
            navHeader = "Projects";
        } else if (currentResource.component === "projectShow" && currentResource.project) {
            navHeader = currentResource.project.name;
        } else {    // this condition allows control flow to proceed to componentDidUpdate in case currentResource.project is undefined
            navHeader = ""
        }

        return (
            <div className="home-container">
                <div className="home-sidebar"><Link to="/home/projects">Projects Index</Link></div>
                <div className="home-main">
                    <div className="home-topbar">
                        <nav className="home-topbar-left">
                           <div className="home-topbar-left-icon"></div>
                           <div className="home-topbar-left-navs">
                                <ul className="topbar-project-info">
                                    <li>{navHeader}</li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <ul className="topbar-project-views">
                                    <li>List</li>
                                    <li>Timeline</li>
                                    <li>Calendar</li>
                                    <li>Forms</li>
                                    <li>Conversations</li>
                                    <li>Progress</li>
                                    <li>Files</li>
                                </ul>
                           </div>
                        </nav>
                        <nav className="home-topbar-right">
                            <ul>
                                <li>Search</li>
                                <li className="topbar-new-project-button"><Link to="/projects/new"><i className="fas fa-plus"></i> New</Link></li>
                                <li>Question</li>
                                <li>Upgrade</li>
                                <li><button onClick={this.handleClick}>Sign Out</button></li>
                            </ul>                            
                        </nav>
                    </div>
                    <div className="home-main-content">
                        <h1>Welcome, {currentUser.primaryEmail}! This is your home page (for now)</h1>

                        <Switch>
                            <ProtectedRoute path="/home/projects/:projectId" component={ProjectShowContainer} />
                            <ProtectedRoute path="/home/projects" component={ProjectIndexContainer} />
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

    let currentResource
    if (resource === "projects") {
        currentResource = {
            component: "projectShow",
            project: state.entities.projects[resourceId],   // pass current project as a prop
        }
    // } else if (resource === "tasks") {
    //     currentResource = {
    //         component: "taskShow",
    //         task: state.entities.tasks[resourceId],      // to flesh out later: pass current task as a prop
    //     }
    } else if (resource === "home") {
        currentResource = {
            component: "projectIndex",
        }
    } else if (resource === "") {
        currentResource = {
            component: "home",
        }
    };

    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    return ({ currentUser, currentResource });
};

const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        fetchProjects: () => dispatch(fetchProjects()),
    });
};

// export default connect(msp, mdp)(Home);
export default withRouter(connect(msp, mdp)(Home));