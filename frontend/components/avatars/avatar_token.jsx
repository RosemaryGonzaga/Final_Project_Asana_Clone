import React from 'react';
import AvatarIcon from './avatar_icon';
import AvatarTooltip from './avatar_tooltip';

class AvatarToken extends React.Component {
    constructor(props) {
        super(props);

        this.displayTooltip = this.displayTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    displayTooltip(e) {
        const { user, idProp } = this.props;
        const tooltip = document.getElementById(`avatar-tooltip ${idProp}`);
        // if (tooltip) tooltip.classList.remove("hidden");
        if (tooltip && e.target === e.currentTarget) tooltip.classList.remove("hidden");
        // if (tooltip && e.target === e.currentTarget && tooltip.classList.contains("hidden")) tooltip.classList.remove("hidden");
        // debugger
        // Hide other tooltips
    }

    hideTooltip(e) {
        const { user, idProp } = this.props;
        const tooltip = document.getElementById(`avatar-tooltip ${idProp}`);
        if (tooltip) tooltip.classList.add("hidden");
        // if (tooltip && e.target === e.currentTarget) tooltip.classList.add("hidden");
        // if (tooltip && e.target === e.currentTarget && !tooltip.classList.contains("hidden")) tooltip.classList.add("hidden");
    }

    render() {
        const { user, size, pointer, onClick, dropdown, tooltip, tooltipPos, idProp } = this.props;  // user and size are required props
        // Props to add later: color, click handler, child components (dropdown, tooltip) ... default values?
        /* DESCRIPTION OF OPTIONAL PROPS:
            1) pointer: if truthy, cursor-pointer style is applied to the token
            2) onClick: specifies a click handler (typically bound to the parent component)
            3) idProp is passed onto a child component, AvatarTooltip.
        */

        // Format user initials.
        let initials = "";
        if (user && user.fullName) {
            const nameParts = user.fullName.trim().split(' ');
            if (nameParts.length > 1) { // if first and last name, capitalize the initials
                initials = nameParts.slice(0, 2).map(part => part.slice(0, 1).toUpperCase());
            } else {    // if only a first name, display first two letters
                initials = user.fullName.slice(0, 2);
            }
        } else if (user) {    // if no full name, display the abbreviated email address
            initials = user.primaryEmail.slice(0, 2);
        }

        // If the user has a "photo" (avatar), display the avatar.
        // Otherwise, display the user's initials.
        const avatar = user && user.photoUrl ? <AvatarIcon photoUrl={user.photoUrl} /> : initials;

        // Use optional props
        const pointerClass = pointer ? "pointer" : "";
        const clickHandler = onClick ? onClick : () => null;
        const dropdownElement = dropdown ? dropdown : null;
        const mouseEnterHandler = tooltip ? this.displayTooltip : () => null;
        const mouseLeaveHandler = tooltip ? this.hideTooltip : () => null;
        let tooltipElement = null;
        // let xPos, yPos;
        // if (tooltipPos) [xPos, yPos] = tooltipPos;
        if (tooltip === "standard") {
            // tooltipElement = <AvatarTooltip user={user} xPos={xPos} yPos={yPos}/>;
            tooltipElement = <AvatarTooltip user={user} tooltipPos={tooltipPos} idProp={idProp} />;
        } else if (tooltip === "small") {   // small dark gray tooltip (ex: AvatarToken in upper-right corner)
            tooltipElement = <AvatarTooltip user={user} tooltipPos={tooltipPos} idProp={idProp} />; // assign a different component
        }

        return (
            // <div className="avatar-task-show-large">{initials}</div>
            <div className={`avatar-token ${size}-token ${pointerClass}`} onClick={clickHandler}
                onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} >
                {avatar}
                {dropdownElement}
                {tooltipElement}
            </div>
        );
    }
}

export default AvatarToken;