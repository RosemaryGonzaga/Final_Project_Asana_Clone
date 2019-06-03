export const RECEIVE_NAV_HEADER = "RECEIVE_NAV_HEADER";

export const receiveNavHeader = header => {
    return ({
        type: RECEIVE_NAV_HEADER,
        header     // header will be a string (e.g., current project's title, home, etc)
    });
};