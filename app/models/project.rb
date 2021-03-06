# == Schema Information
#
# Table name: projects
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :text
#  layout      :string           not null
#  privacy     :string           not null
#  due_on      :datetime
#  color       :string
#  owner_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  team_id     :integer
#

class Project < ApplicationRecord
    validates :name, :layout, :privacy, :owner_id, presence: true

    # to do later: associations (belongs to team, has many tasks, has many members via teams?)
    # may need to rewrite this later to allow for many-to-many association...
    belongs_to :user,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :User

    has_many :sections, dependent: :destroy,
        primary_key: :id,
        foreign_key: :project_id,
        class_name: :Section

    has_many :tasks,
        through: :sections,
        source: :tasks

    belongs_to :team,
        primary_key: :id,
        foreign_key: :team_id,
        class_name: :Team

    has_many :favorited_project_associations,
        primary_key: :id,
        foreign_key: :project_id,
        class_name: :FavoritedProject

    has_many :followers,
        through: :favorited_project_associations,
        source: :user

    # has_many :tasks,
    #     primary_key: :id,
    #     foreign_key: :project_id,
    #     class_name: :Task
end
