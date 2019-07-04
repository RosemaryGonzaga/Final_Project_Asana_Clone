// refactored to take in teamId (only need to fetch users associated with a specific team...for now)
export const fetchUsers = teamId => {
    return $.ajax({
        method: 'GET',
        url: '/api/users',
        data: { team_id: teamId }
    });
}