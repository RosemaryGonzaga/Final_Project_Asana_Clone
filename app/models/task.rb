# == Schema Information
#
# Table name: tasks
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  description  :text
#  due_on       :datetime
#  project_id   :integer
#  section_id   :integer
#  assignee_id  :integer
#  completed    :boolean
#  completed_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Task < ApplicationRecord
    validates :name, presence: true

    # validations: belongs to both project and section for now (later it would be one or the other)
    # belongs_to :project,
    #     primary_key: :id,
    #     foreign_key: :project_id,
    #     class_name: :Project

    belongs_to :section,
        primary_key: :id,
        foreign_key: :section_id,
        class_name: :Section

    belongs_to :assignee,
        primary_key: :id,
        foreign_key: :assignee_id,
        class_name: :User

    has_one :project,
        through: :section,
        source: :project
end
