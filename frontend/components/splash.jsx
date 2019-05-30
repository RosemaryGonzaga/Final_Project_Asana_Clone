import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Splash = props => {

    return (
        <div>
            <h2>This is the splash page. Please sign in!</h2>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Try for Free</Link>
        </div>
    );
};

export default Splash;