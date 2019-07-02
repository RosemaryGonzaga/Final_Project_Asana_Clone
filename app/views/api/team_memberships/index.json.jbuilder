@team_memberships.each do |team_membership|
    json.set! team_membership.id do
        json.partial! 'api/team_memberships/team_membership', team_membership: team_membership
    end
end