export const selectAllProjects = state => {
    return Object.values(state.entities.projects);
};

export const selectAllSections = state => {
    return Object.values(state.entities.sections);
};

export const selectAllTasks = state => {
    return Object.values(state.entities.tasks);
};