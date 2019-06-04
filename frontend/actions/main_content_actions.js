export const RECEIVE_MAIN_CONTENT = "RECEIVE_MAIN_CONTENT";

export const receiveMainContent = content => {
    return ({
        type: RECEIVE_MAIN_CONTENT,
        content     // content will be a string, either "projectIndex" or "projectShow" ... for now (add tasks later)
    });
};