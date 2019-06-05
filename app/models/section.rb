# == Schema Information
#
# Table name: sections
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  description  :text
#  due_on       :datetime
#  project_id   :integer          not null
#  assignee_id  :integer
#  completed    :boolean
#  completed_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  layout       :string           not null
#

class Section < ApplicationRecord
    validates :name, :layout, presence: true

    belongs_to :project,
        primary_key: :id,
        foreign_key: :project_id,
        class_name: :Project

    # not sure if I need this association right now?
    belongs_to :assignee,
        primary_key: :id,
        foreign_key: :assignee_id,
        class_name: :User

    has_many :tasks,
        primary_key: :id,
        foreign_key: :section_id,
        class_name: :Task
end
