class AddIndexToTeamMemberships < ActiveRecord::Migration[5.2]
  def change
    add_index :team_memberships, [:user_id, :team_id], unique: true
  end
end
