import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';

class ProfileSettingsProfile extends React.Component {
    constructor(props) {
        super(props);
        const { currentUser } = this.props;
        this.state = {
            id: currentUser.id,
            fullName: currentUser.fullName,
            photoUrl: currentUser.photoUrl,
            pronouns: currentUser.pronouns,
            role: currentUser.role,
            department: currentUser.department,
            about: currentUser.about,
            changeAvatar: false, // not part of profile info;
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { updateUser, closeModal } = this.props;
        updateUser(this.state);
        closeModal();
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        };
    }

    render() {
        const { fullName, photoUrl, pronouns, role, department, about, changeAvatar } = this.state;

        const avatarImages = {
            kiwi: <i className="fas fa-kiwi-bird"></i>,
            cat: <i className="fas fa-cat"></i>,
            dog: <i className="fas fa-dog"></i>,
            frog: <i className="fas fa-frog"></i>,
            dove: <i className="fas fa-dove"></i>,
            dragon: <i className="fas fa-dragon"></i>,
            fish: <i className="fas fa-fish"></i>,
            hippo: <i className="fas fa-hippo"></i>,
        };

        const avatar = avatarImages.hasOwnProperty(photoUrl) ? avatarImages[photoUrl] : <i className="fas fa-user"></i>;

        const avatarRadioInputsClass = changeAvatar ? "" : " hidden";
        
        const avatarRadioInputs = Object.keys(avatarImages).map(key => {
            const key2 = key === "kiwi" ? "-bird" : "";
            let input;
            if (key === photoUrl) {
                input = <input type="radio" name="avatar" value={`${key}`} id={`${key}`} onChange={this.handleChange("photoUrl")} checked />
            } else {
                input = <input type="radio" name="avatar" value={`${key}`} id={`${key}`} onChange={this.handleChange("photoUrl")} />
            }

            return (
                <div key={`${key}`}>
                    {input}
                    <label htmlFor={`${key}`}><i className={`fas fa-${key}${key2}`}></i></label>
                </div>
            )
        });

        const descriptionPlaceholder = "I usually work from 9am-5pm PST. Feel free to assign me a task with a due date anytime. Also, I love dogs!";
        const pronounPlaceholder = "Third-person pronouns (e.g. she/her/hers)";

        return (
            <div className="profile-settings-profile-container">
                <form onSubmit={this.handleSubmit}>

                    <div className="profile-settings-avatar">
                        <span className="profile-settings-avatar-label">Your avatar</span>
                        <div className="profile-settings-avatar-main">
                            <div className="profile-settings-avatar-main-img-frame" onClick={() => this.setState({ changeAvatar: true })}>
                                {avatar}
                            </div>
                            <div className="profile-settings-avatar-main-text">
                                <div className="profile-settings-avatar-main-text-top">
                                    <span onClick={() => this.setState({ changeAvatar: true })}>Change your avatar</span>
                                    <span className={`profile-settings-avatar-radio-inputs${avatarRadioInputsClass}`}>
                                        {avatarRadioInputs}
                                    </span>
                                </div>
                                <span className="profile-settings-avatar-main-text-bottom">Avatars help your teammates recognize you in Asana</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-settings-profile-full-name">
                        <label htmlFor="profileSettingsFullName" className="profile-settings-label">Full name</label>
                        <input type="text" value={fullName ? fullName : ""} id="profileSettingsFullName"
                            onChange={this.handleChange("fullName")} 
                            className="profile-settings-input" />
                    </div>

                    <div className="profile-settings-profile-pronouns">
                        <label htmlFor="profileSettingsPronouns" className="profile-settings-label">Pronouns</label>
                        <input type="text" value={pronouns ? pronouns : ""} id="profileSettingsPronouns"
                            onChange={this.handleChange("pronouns")}
                            className="profile-settings-input" 
                            placeholder={`${pronounPlaceholder}`}/>
                    </div>

                    <div className="profile-settings-profile-role">
                        <label htmlFor="profileSettingsRole" className="profile-settings-label">Role</label>
                        <input type="text" value={role ? role : ""} id="profileSettingsRole"
                            onChange={this.handleChange("role")}
                            className="profile-settings-input" />
                    </div>

                    <div className="profile-settings-profile-department">
                        <label htmlFor="profileSettingsDepartment" className="profile-settings-label">Department</label>
                        <input type="text" value={department ? department : ""} id="profileSettingsDepartment"
                            onChange={this.handleChange("department")}
                            className="profile-settings-input" />
                    </div>

                    <div className="profile-settings-profile-about">
                        <label htmlFor="profileSettingsAbout" className="profile-settings-label">About</label>
                        <textarea type="text" value={about ? about : ""} id="profileSettingsAbout"
                            onChange={this.handleChange("about")}
                            className="profile-settings-input long-input"
                            placeholder={`${descriptionPlaceholder}`}>
                        </textarea>
                    </div>

                    <input type="submit" value="Save Changes" />
                </form>
            </div>
        );
    }
}

const msp = state => {
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    return { currentUser };
};

const mdp = dispatch => {
    return {
        updateUser: user => dispatch(updateUser(user)),
        closeModal: () => dispatch(closeModal()),
    };
};

export default connect(msp, mdp)(ProfileSettingsProfile);