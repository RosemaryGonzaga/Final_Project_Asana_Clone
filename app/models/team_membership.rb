# == Schema Information
#
# Table name: team_memberships
#
#  id         :bigint           not null, primary key
#  team_id    :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TeamMembership < ApplicationRecord
    validates :team_id, :user_id, presence: true
    validates :user_id, uniqueness: { scope: :team_id, message: "User is already part of this team." }

    belongs_to :team,
        primary_key: :id,
        foreign_key: :team_id,
        class_name: :Team

    belongs_to :member,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
end
