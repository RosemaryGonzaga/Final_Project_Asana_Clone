export const RECEIVE_NAV_HEADER = "RECEIVE_NAV_HEADER";
export const RESET_NAV_HEADER = "RESET_NAV_HEADER";

export const receiveNavHeader = header => {
    return ({
        type: RECEIVE_NAV_HEADER,
        header     // header will be a string (e.g., current project's title, home, etc)
    });
};

export const resetNavHeader = () => {
    return ({
        type: RESET_NAV_HEADER,
        header: "Home"     // reset to default (preloaded) state
    });
};