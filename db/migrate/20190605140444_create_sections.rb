class CreateSections < ActiveRecord::Migration[5.2]
  def change
    create_table :sections do |t|
      t.string :name, null: false
      t.text :description
      t.datetime :due_on
      t.integer :project_id, null: false
      t.integer :assignee_id
      t.boolean :completed
      t.datetime :completed_at
      t.timestamps
    end
    add_index :sections, :project_id
    add_index :sections, :assignee_id
  end
end
