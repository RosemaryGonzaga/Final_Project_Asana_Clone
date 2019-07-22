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

export const updateUser = user => {
    const { primaryEmail, password, fullName, pronouns, role, department, about } = user;
    return $.ajax({
        method: "PATCH",
        url: `api/users/${user.id}`,
        data: {
            user: {
                password, pronouns, role, department, about,
                primary_email: primaryEmail,
                full_name: fullName,
            }
        },
    });
};

// $.ajax({
//     method: 'GET',
//     url: '/api/users/search',
//     data: { email },
// }).then(response => {
//     console.log(response);
//     debugger
// });