class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description
      t.datetime :due_on
      t.integer :project_id
      t.integer :section_id
      t.integer :assignee_id
      t.boolean :completed
      t.datetime :completed_at
      t.timestamps
    end
    add_index :tasks, :project_id
    add_index :tasks, :section_id
    add_index :tasks, :assignee_id
  end
end
