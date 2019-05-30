import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Splash = props => {

    return (
        <div>
            <h2>This is the splash page. In progress, but please visit this route and throw some errors at it: /#/login_page</h2>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Try for Free</Link>
        </div>
    );
};

export default Splash;