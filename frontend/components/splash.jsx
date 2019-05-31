import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// new code
import { openModal } from '../actions/modal_actions';


const Splash = props => {
    const { openModal } = props;
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
                        {/* <Link to="/login">Log In</Link> */}
                        {/* <div className="free-trial-button"><Link to="/signup">Try for Free</Link></div> */}
                        <button onClick={() => openModal('login')}>Log In</button>
                        <button onClick={() => openModal('signup')}>Signup</button>
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


// export default Splash;

// new code for modal:
const mdp = dispatch => {
    // debugger
    return ({
        openModal: modal => dispatch(openModal(modal))
    });
};

export default connect(null, mdp)(Splash);

/* THINGS LEARNED / BUGS: 
1. Since I didn't unpack openModal from the presentational component's 
    props, I was actually invoking the openModal action in the Log In
    button's callback, instead of invoking the openModal prop, which meant 
    I wasn't dispatching the action. (Issue with similarly named vars.)
    Used debuggers to figure out the action wasn't actually hitting my
    modal reducer.
*/