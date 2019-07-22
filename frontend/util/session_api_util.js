export const signup = user => {
    return $.ajax({
        method: "POST",
        url: "api/users",
        data: { 
            user: {
                primary_email: user.primaryEmail,
                password: user.password,
                // full_name: "",
                // pronouns: "", 
                // role: "", 
                // department: "", 
                // about: "",
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