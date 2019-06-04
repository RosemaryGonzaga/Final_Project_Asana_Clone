import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/session_actions';
import ProjectIndexContainer from './projects/project_index_container';
import ProjectShowContainer from './projects/project_show_container';
// import { receiveMainContent } from '../actions/main_content_actions';
// import { receiveNavHeader } from '../../actions/nav_header_actions';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import NewProjectForm from './projects/new_project_form';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
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
        } else if (currentResource.component === "projectShow") {
            navHeader = currentResource.project.name;
        }

        // console.log(this.props);
        // const { currentUser, history, match } = this.props;
        // const path = history.location.pathname;
        // const projectId = match.params;
        // let navHeader;
        // if (path === "/home") {
        //     navHeader = "Home";
        // } else if (path === "/home/projects") {
        //     navHeader = "Projects";
        // } else {
        //     navHeader = `Current project id: ${projectId}`
        // }

        // const { signout, currentUser, mainContent, navHeader } = this.props; // Added mainContent and navHeader--> test if this works
        // let contentToRender;
        // if (mainContent === "projectIndex") {
        //     contentToRender = (<ProjectIndexContainer />);
        // } else if (mainContent === "projectShow") {
        //     contentToRender = (<ProjectShowContainer />); // need to import this component
        // }

        return (
            <div className="home-container">
                {/* <button onClick={this.handleClick}>Sign Out</button> */}
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
                        {/* <NewProjectForm /> */}
                        {/* <ProjectIndexContainer /> */}

                        
                        <Switch>
                            {/* <ProtectedRoute path="/home/projects/new" component={NewProjectForm} /> */}
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
    //         task: state.entities.tasks[resourceId],         // pass current task as a prop
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

    // console.log(pathParts);
    // console.log(resource);
    // console.log(resourceId);
    // debugger
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    // const { mainContent, navHeader } = state.ui;       // test if this is correct
    // return ({ currentUser, mainContent, navHeader });  // added mainContent and navHeader -> need to test if it works
    return ({ currentUser, currentResource });
};

const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        // receiveMainContent: content => dispatch(receiveMainContent(content)),
    });
};

// export default connect(msp, mdp)(Home);
export default withRouter(connect(msp, mdp)(Home));