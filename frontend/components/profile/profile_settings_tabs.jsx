import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import ProfileSettingsProfile from './profile_settings_profile';
import ProfileSettingsAccount from './profile_settings_account';

class ProfileSettingsTabs extends React.Component {
    constructor(props) {
        super(props);
        // const { selectedTab } = this.props;
        // this.state = { selectedTab };
        this.state = { selectedTab: "Profile" };

        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab(e) {
        const newState = this.state.selectedTab === "Profile" ? "Account" : "Profile";
        this.setState({ selectedTab: newState });
    }

    render() {
        const { closeModal } = this.props;
        const { selectedTab } = this.state;

        const profileClass = selectedTab === "Profile" ? "profile-settings-profile selected-tab" : "profile-settings-profile unselected-tab";
        const accountClass = selectedTab === "Account" ? "profile-settings-account selected-tab" : "profile-settings-account unselected-tab";
        const settingsContent = selectedTab === "Profile" ? <ProfileSettingsProfile /> : <ProfileSettingsAccount />;

        return (
            <div className="profile-settings-container">
                <button className="profile-settings-close-btn" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="profile-settings-header">
                    <h1>My Profile Settings </h1>
                    <nav className="profile-settings-nav">
                        <div className={profileClass} onClick={this.toggleTab}>Profile</div>
                        <div className={accountClass} onClick={this.toggleTab}>Account</div>
                    </nav>
                </div>

                {settingsContent}
            </div>
        );
    }
}

// const msp = state => {
//     const currentTeam = state.ui.currentTeam;
//     const currentUserId = state.session.id;
//     return { currentTeam, currentUserId };
// }

const mdp = dispatch => {
    return ({
        closeModal: () => dispatch(closeModal()),
    });
};

export default connect(null, mdp)(ProfileSettingsTabs);