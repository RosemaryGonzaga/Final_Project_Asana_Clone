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
    belongs_to :team,
        primary_key: :id,
        foreign_key: :team_id,
        class_name: :Team

    belongs_to :member,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
end
