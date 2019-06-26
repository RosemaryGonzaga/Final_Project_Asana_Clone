import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';
import SignupFormMini from './auth/signup_form_mini';

const Splash = props => {
    const { openModal } = props;

    window.onscroll = function() { 
        let topNav = document.getElementsByClassName('splash-main-nav');
        topNav[0].className += ' topbar-scrolled';
        let yOffset = window.pageYOffset;
        if (yOffset === 0) {
            topNav[0].className = 'splash-main-nav';
        }
    }

    return (
        <div className="splash-container">
            <header className="splash-main-nav">
                <a href=""><img src={window.asanaLogoSplash} alt="logo" className="splash-logo-link" /></a>
                <nav className="splash-right-nav">
                    <ul>
                        {/* <a href="">Templates</a>
                        <a href="">Product</a>
                        <a href="">Pricing</a>
                        <a href="">Solutions</a>
                        <a href="">Contact Sales</a> */}
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
                        {/* <a href="https://www.facebook.com/rosemary.gonzaga.1"><i className="fab fa-facebook"></i></a> */}
                        <a href="https://github.com/RosemaryGonzaga"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/rosemary-gonzaga-125bb790/"><i className="fab fa-linkedin"></i></a>
                        <a href="https://angel.co/rosemary-gonzaga?public_profile=1"><i className="fab fa-angellist"></i></a>
                        <a href="https://rosemarygonzaga.github.io/Portfolio/"><i className="fas fa-globe"></i></a>
                    </div>
                    {/* <footer>
                        <ul>
                            <li>English</li>
                            <li>Privacy</li>
                            <li>Social Media</li>
                            <li>Download on the App Store</li>
                            <li>Get it on Google Play</li>
                        </ul>
                    </footer> */}
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