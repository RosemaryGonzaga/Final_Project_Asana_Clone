export const selectAllProjects = state => {
    return Object.values(state.entities.projects);
};