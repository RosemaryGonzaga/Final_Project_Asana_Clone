import React from 'react';
import AvatarIcon from './avatar_icon';

class AvatarToken extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, size, pointer, onClick, dropdown } = this.props;  // user and size are required props
        // Props to add later: color, click handler, child components (dropdown, tooltip) ... default values?
        /* DESCRIPTION OF OPTIONAL PROPS:
            1) pointer: if truthy, cursor-pointer style is applied to the token
            2) onClick: specifies a click handler (typically bound to the parent component)
        */

        // Format user initials.
        let initials = "";
        if (user.fullName) {
            const nameParts = user.fullName.trim().split(' ');
            if (nameParts.length > 1) { // if first and last name, capitalize the initials
                initials = nameParts.slice(0, 2).map(part => part.slice(0, 1).toUpperCase());
            } else {    // if only a first name, display first two letters
                initials = user.fullName.slice(0, 2);
            }
        } else {    // if no full name, display the abbreviated email address
            initials = user.primaryEmail.slice(0, 2);
        }

        // If the user has a "photo" (avatar), display the avatar.
        // Otherwise, display the user's initials.
        const avatar = user.photoUrl ? <AvatarIcon photoUrl={user.photoUrl} /> : initials;

        // Use optional props
        const pointerClass = pointer ? "pointer" : "";
        const clickHandler = onClick ? onClick : () => null;
        const dropdownElement = dropdown ? dropdown : null;

        return (
            // <div className="avatar-task-show-large">{initials}</div>
            <div className={`avatar-token ${size}-token ${pointerClass}`} onClick={clickHandler}>
                {/* {initials} */}
                {avatar}
                {dropdownElement}
            </div>
        );
    }
}

export default AvatarToken;