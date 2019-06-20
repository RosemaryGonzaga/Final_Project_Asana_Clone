export const fetchSections = projectId => {     // different from the usual pattern
    return $.ajax({
        method: 'GET',
        url: '/api/sections',
        data: { project_id: projectId }
    });
}

export const fetchSection = id => {
    return $.ajax({
        method: 'GET',
        url: `/api/sections/${id}`,
    });
}

export const createSection = section => {
    const { name, description, layout, projectId, assigneeId, dueOn, completed, completedAt } = section;
    debugger
    return $.ajax({
        method: 'POST',
        url: '/api/sections',
        data: {
            section: {
                name, description, layout, completed,
                project_id: projectId,
                assignee_id: assigneeId,
                due_on: dueOn,
                completed_at: completedAt,
            }
        }
    });
}

export const updateSection = section => {
    const { name, description, layout, projectId, assigneeId, dueOn, completed, completedAt } = section;
    return $.ajax({
        method: 'PATCH',
        url: `/api/sections/${section.id}`,
        data: {
            section: {
                name, description, layout, completed,
                project_id: projectId,
                assignee_id: assigneeId,
                due_on: dueOn,
                completed_at: completedAt,
            }
        }
    });
}

export const deleteSection = id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/sections/${id}`,
    });
}