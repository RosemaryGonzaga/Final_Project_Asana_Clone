import React from 'react';

const AvatarIcon = props => {

    const avatarIcons = {
        kiwi: <i className="fas fa-kiwi-bird"></i>,
        cat: <i className="fas fa-cat"></i>,
        dog: <i className="fas fa-dog"></i>,
        frog: <i className="fas fa-frog"></i>,
        dove: <i className="fas fa-dove"></i>,
        dragon: <i className="fas fa-dragon"></i>,
        fish: <i className="fas fa-fish"></i>,
        hippo: <i className="fas fa-hippo"></i>,
    };

    const { photoUrl } = props;

    const avatar = avatarIcons.hasOwnProperty(photoUrl) ? avatarIcons[photoUrl] : <i className="fas fa-user"></i>;

    return (
        // <div>{avatar}</div>
        <>
            {avatar}
        </>
    );
};

export default AvatarIcon;