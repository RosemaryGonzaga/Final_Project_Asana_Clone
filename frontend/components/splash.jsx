import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';
import SignupFormMini from './auth/signup_form_mini';

const Splash = props => {
    const { openModal } = props;

    // function handleScroll() {
    //     document.getElementsByClassName('splash-main-nav').setAttribute("class", "topbar-scrolled");
    // }

    window.onscroll = function() { 
        // document.getElementsByClassName('splash-main-nav').setAttribute("class", "topbar-scrolled");
        let topNav = document.getElementsByClassName('splash-main-nav');
        // topNav[0].setAttribute("class", "topbar-scrolled");
        topNav[0].className += ' topbar-scrolled';
        // debugger
        let yOffset = window.pageYOffset;
        if (yOffset === 0) {
            topNav[0].className = 'splash-main-nav';
        }
        // debugger
    }

    return (
        <div className="splash-container">
            <header className="splash-main-nav">
                {/* <Link to="/"><img src={window.asanaLogoSplash} alt="logo" className="splash-logo-link"/></Link> */}
                <a href=""><img src={window.asanaLogoSplash} alt="logo" className="splash-logo-link" /></a>
                <nav className="splash-right-nav">
                    <ul>
                        <a href="">Templates</a>
                        <a href="">Product</a>
                        <a href="">Pricing</a>
                        <a href="">Solutions</a>
                        <a href="">Contact Sales</a>
                        <button className="splash-login-button" onClick={() => openModal('login')}>Log In</button>
                        <button className="splash-free-trial-button" onClick={() => openModal('signup')}>Try for free</button>
                    </ul>
                </nav>
            </header>

            <div className="splash-background">
                <div className="cushion"></div>
                <div className="splash-section splash-greeting-form">
                    <h1>Make more time for the work that matters most</h1>
                    <h2>Asana is the work management platform teams use to stay focused on the goals, projects, and daily tasks that grow business.</h2>                    
                    <SignupFormMini />
                </div>

                <div className="splash-section splash-video-banner">
                    <video src={window.splashVideo} autoPlay loop muted></video>
                </div>

                <div className="splash-section splash-footer">
                    <div className="splash-footer-top">
                        {/* <i className="fab fa-facebook-f"></i> */}
                        <a href="https://www.facebook.com/rosemary.gonzaga.1"><i className="fab fa-facebook"></i></a>
                        <a href="https://github.com/RosemaryGonzaga"><i className="fab fa-github"></i></a>
                    </div>
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
            </div>
        </div>     
    );
};


const mdp = dispatch => {
    return ({
        openModal: modal => dispatch(openModal(modal))
    });
};

export default connect(null, mdp)(Splash);