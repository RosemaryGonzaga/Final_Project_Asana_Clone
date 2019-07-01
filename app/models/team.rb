# == Schema Information
#
# Table name: teams
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :text
#  privacy     :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Team < ApplicationRecord
    validates :name, presence: true
    
    has_many :memberships,
        primary_key: :id,
        foreign_key: :team_id,
        class_name: :TeamMemberships

    has_many :projects,
        primary_key: :id,
        foreign_key: :team_id,
        class_name: :Project
end
