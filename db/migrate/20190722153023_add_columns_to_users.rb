class AddColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :pronouns, :string
    add_column :users, :role, :string
    add_column :users, :department, :string
    add_column :users, :about, :text
  end
end
