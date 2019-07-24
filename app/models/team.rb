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
    
    has_many :memberships, dependent: :destroy,
        primary_key: :id,
        foreign_key: :team_id,
        class_name: :TeamMembership

    has_many :members,
        through: :memberships,
        source: :member

    has_many :projects, dependent: :destroy,
        primary_key: :id,
        foreign_key: :team_id,
        class_name: :Project
end

# NOTE: not sure if :description and :privacy are needed
# these fields don't appear in the create / manage workspace forms
# but :description is listed as a field in the Asana developers api reference
# To consider later: run migration to remove these two columns?