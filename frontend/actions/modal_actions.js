export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = modal => {
    return ({
        type: OPEN_MODAL,
        modal
    });
};

export const closeModal = () => {
    return ({
        type: CLOSE_MODAL
    });
};


// // tweaking with my own modal actions here
// export const openEditTaskModal = (modal, taskId) => {
//     return ({
//         type: OPEN_MODAL,
//         modal,
//         taskId
//     });
// };