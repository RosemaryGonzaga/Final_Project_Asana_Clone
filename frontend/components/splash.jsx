import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';

// new new code
import SignupFormMini from './signup_form_mini';

const Splash = props => {
    const { openModal } = props;
    return (
        <div className="splash-container">
            <header className="splash-main-nav">
                <div className="splash-left-nav">
                    <img src={window.asanaLogoSplash} alt="logo" />
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
                        <button className="splash-login-button" onClick={() => openModal('login')}>Log In</button>
                        <button className="splash-free-trial-button" onClick={() => openModal('signup')}>Try for free</button>
                    </ul>
                </nav>
            </header>

            <div className="splash-background">
                <div className="temporary-cushion"></div>
                <div className="splash-section splashGreetingForm">
                    <h1>Make more time for the work that matters most</h1>
                    <h2>Asana is the work management platform teams use to stay focused on the goals, projects, and daily tasks that grow business.</h2>
                    
                    <SignupFormMini />
                </div>
                <div className="splash-section splash-images-banner">placeholder for images and animation</div>
                <div className="splash-section splash-value-prop-banner">placeholder for value prop</div>
                <div className="splash-section splash-footer">
                    <div></div>
                    <footer>
                        <ul>
                            <li>English</li>
                            <li>Privacy</li>
                            <li>Social Media</li>
                            <li>Download on the App Store</li>
                            <li>Get it on Google Play</li>
                        </ul>
                    </footer>
                </div>

                {/* <p>To do: add modal, images, signup form...</p> */}
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