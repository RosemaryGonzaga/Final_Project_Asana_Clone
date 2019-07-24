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

// This uses the same backend route as fetchUserByEmail,
// but it is used to check a logged in user's password.
// It will hit the #show action of the UsersController.
export const checkPassword = user => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${user.id}`,
        data: {
            user: {
                primary_email: user.primaryEmail,
                password: user.password,
            }
        },
    });
}

export const updateUser = user => {
    const { primaryEmail, password, fullName, photoUrl, pronouns, role, department, about } = user;
    return $.ajax({
        method: "PATCH",
        url: `api/users/${user.id}`,
        data: {
            user: {
                password, pronouns, role, department, about,
                primary_email: primaryEmail,
                full_name: fullName,
                photo_url: photoUrl,
            }
        },
    });
};

export const deleteUser = id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/users/${id}`,
    });
}