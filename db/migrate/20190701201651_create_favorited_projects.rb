class CreateFavoritedProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :favorited_projects do |t|
      t.integer :project_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :favorited_projects, :project_id
    add_index :favorited_projects, :user_id
  end
end
