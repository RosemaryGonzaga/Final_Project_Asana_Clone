export const fetchProjects = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/projects',
    });
}

export const fetchProject = id => {
    return $.ajax({
        method: 'GET',
        url: `/api/projects/${id}`,
    });
}

export const createProject = project => {
    const { name, description, layout, privacy, ownerId } = project;
    return $.ajax({
        method: 'POST',
        url: '/api/projects',
        data: {
            project: {
                name, description, layout, privacy,
                owner_id: ownerId
            }
        }
    });
}

export const updateProject = project => {
    const { name, description, layout, privacy, ownerId, color, dueOn } = project;
    return $.ajax({
        method: 'PATCH',
        url: `/api/projects/${project.id}`,
        data: {
            project: {
                name, description, layout, privacy, color,
                owner_id: ownerId,
                due_on: dueOn,
            }
        }
    });
}

export const deleteProject = id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/projects/${id}`,
    });
}