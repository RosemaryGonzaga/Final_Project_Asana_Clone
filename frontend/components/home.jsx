import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

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
                <div className="home-sidebar">Sidebar</div>
                <div className="home-main">
                    <div className="home-topbar">
                        <nav className="home-topbar-left">Left Nav (dynamic)</nav>
                        <nav className="home-topbar-right">
                            <ul>
                                <li>Search</li>
                                <li>+ New</li>
                                <li>Question</li>
                                <li>Upgrade</li>
                                <li><button onClick={this.handleClick}>Sign Out</button></li>
                            </ul>                            
                        </nav>
                    </div>
                    <div className="home-main-content">
                        <h1>Welcome, {currentUser.primaryEmail}! This is your home page (for now)</h1>
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