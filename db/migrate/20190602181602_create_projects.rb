class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.text :description
      t.string :layout, null: false
      t.string :privacy, null: false
      t.datetime :due_on
      t.string :color
      t.integer :owner_id, null: false
      t.timestamps
    end
    add_index :projects, :owner_id
  end
end
