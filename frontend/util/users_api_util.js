// refactored to take in teamId (only need to fetch users associated with a specific team...for now)
export const fetchUsers = teamId => {
    return $.ajax({
        method: 'GET',
        url: '/api/users',
        data: { team_id: teamId }
    });
}

export const fetchUserByEmail = email => {
    // debugger
    return $.ajax({
        method: 'GET',
        url: '/api/users/search',
        data: { email },
    });
}

// $.ajax({
//     method: 'GET',
//     url: '/api/users/search',
//     data: { email },
// }).then(response => {
//     console.log(response);
//     debugger
// });