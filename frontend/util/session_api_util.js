// refactored to format data keys (user params) in snake_case
export const signup = user => {
    return $.ajax({
        method: "POST",
        url: "api/users",
        data: { 
            user: {
                primary_email: user.primaryEmail,
                password: user.password,
            }
        },
    });
};

export const login = user => {
    return $.ajax({
        method: "POST",
        url: "api/session",
        data: {
            user: {
                primary_email: user.primaryEmail,
                password: user.password,
            }
        },
    });
};

export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: "api/session",
    });
};



// // This code worked before I added components and refactored json response to format keys in camelCase instead of snake_case
// export const signup = user => {
//     return $.ajax({
//         method: "POST",
//         url: "api/users",
//         data: { user },
//     });
// };

// export const login = user => {
//     return $.ajax({
//         method: "POST",
//         url: "api/session",
//         data: { user },
//     });
// };

// export const logout = () => {
//     return $.ajax({
//         method: "DELETE",
//         url: "api/session",
//     });
// };