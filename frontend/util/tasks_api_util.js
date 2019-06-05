export const fetchTasks = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/tasks',
        // pass current user id in the params?
    });
}

export const fetchTask = id => {
    return $.ajax({
        method: 'GET',
        url: `/api/tasks/${id}`,
    });
}

export const createTask = task => {
    const { name, description, projectId, sectionId, assigneeId, dueOn, completed, completedAt } = task;
    return $.ajax({
        method: 'POST',
        url: '/api/tasks',
        data: {
            task: {
                name, description, completed,
                project_id: projectId,
                section_id: sectionId,
                assignee_id: assigneeId,
                due_on: dueOn,
                completed_at: completedAt,
            }
        }
    });
}

export const updateTask = task => {
    const { name, description, projectId, sectionId, assigneeId, dueOn, completed, completedAt } = task;
    return $.ajax({
        method: 'PATCH',
        url: `/api/tasks/${task.id}`,
        data: {
            task: {
                name, description, completed,
                project_id: projectId,
                section_id: sectionId,
                assignee_id: assigneeId,
                due_on: dueOn,
                completed_at: completedAt,
            }
        }
    });
}

export const deleteTask = id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/tasks/${id}`,
    });
}