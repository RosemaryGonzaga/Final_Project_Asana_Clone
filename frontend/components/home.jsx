import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/session_actions';
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
        const { signout, currentUser } = this.props;
        return (
            <div className="home-container">
                {/* <button onClick={this.handleClick}>Sign Out</button> */}
                <div className="home-sidebar"></div>
                <div className="home-main">
                    <div className="home-topbar">
                        <nav className="home-topbar-left">
                           <div className="home-topbar-left-icon"></div>
                           <div className="home-topbar-left-navs">
                                <ul className="topbar-project-info">
                                    <li>Placeholder for title</li>
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
                                <li className="topbar-new-project-button"><Link to="/projects/new"><i class="fas fa-plus"></i> New</Link></li>
                                <li>Question</li>
                                <li>Upgrade</li>
                                <li><button onClick={this.handleClick}>Sign Out</button></li>
                            </ul>                            
                        </nav>
                    </div>
                    <div className="home-main-content">
                        <h1>Welcome, {currentUser.primaryEmail}! This is your home page (for now)</h1>
                        {/* <NewProjectForm /> */}
                    </div>
                </div>
            </div>
        );
    }
}

const msp = (state, ownProps) => {
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    return ({ currentUser });
};

const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout())
    });
};

export default connect(msp, mdp)(Home);