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

export const deleteTeamMembership = id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/team_memberships/${id}`,
    });
};