# == Schema Information
#
# Table name: favorited_projects
#
#  id         :bigint           not null, primary key
#  project_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class FavoritedProject < ApplicationRecord
    validates :project_id, :user_id, presence: true
    
    belongs_to :project,
        primary_key: :id,
        foreign_key: :project_id,
        class_name: :Project

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
end
