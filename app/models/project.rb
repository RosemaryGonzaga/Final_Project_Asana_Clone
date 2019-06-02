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
#

class Project < ApplicationRecord
    validates :name, :layout, :privacy, :owner_id, presence: true

    # to do later: associations (belongs to team, has many tasks, has many members via teams?)
end
