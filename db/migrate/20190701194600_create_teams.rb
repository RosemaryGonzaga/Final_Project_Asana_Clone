class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.text :description
      t.string :privacy
      t.timestamps
    end
    add_index :teams, :name
  end
end