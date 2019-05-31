import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Splash = props => {

    return (
        <div className="splash-container">
            <header className="splash-main-nav">
                <div className="splash-left-nav">
                    <img src={window.asanaLogoSplash} alt="logo"/>
                </div>
                <nav className="splash-right-nav">
                    <ul>
                        <a href="">Templates</a>
                        <a href="">Product</a>
                        <a href="">Pricing</a>
                        <a href="">Solutions</a>
                        <a href="">Contact Sales</a>
                        <Link to="/login">Log In</Link>
                        <div className="free-trial-button"><Link to="/signup">Try for Free</Link></div>
                    </ul>
                </nav>
            </header>

            <div className="splash-background">
                <h2>This is the splash page.</h2>
                <p>It's still under construction.</p>
                <p>In the meantime, please visit this route and throw some errors at it: /#/login_page</p>
                <p>To do: add modal, images, signup form...</p>
            </div>
        </div>
    );
};

export default Splash;