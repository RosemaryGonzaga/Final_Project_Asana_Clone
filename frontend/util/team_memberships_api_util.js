export const createTeamMembership = teamMembership => {
    const { teamId, userId } = teamMembership;
    return $.ajax({
        method: 'POST',
        url: '/api/team_memberships',
        data: { 
            team_membership: {
                team_id: teamId,
                user_id: userId,
            }
        },
    })
};

// Refactored to take in teamId and userId instead of teamMembershipId
// Right now, front end state doesn't have access to any of the teamMembershipIds
// ... b/c there's no fetchTeamMemberships action (they're not being added to Redux store)
export const deleteTeamMembership = teamMembership => {
    const { teamId, userId } = teamMembership;
    return $.ajax({
        method: 'DELETE',
        url: '/api/team_memberships/delete',
        data: {
            team_membership: {
                team_id: teamId,
                user_id: userId,
            }
        },
    });
};

// export const deleteTeamMembership = id => {
//     return $.ajax({
//         method: 'DELETE',
//         url: `/api/team_memberships/${id}`,
//     });
// };