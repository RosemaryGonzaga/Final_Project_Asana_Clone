class AddLayoutToSections < ActiveRecord::Migration[5.2]
  def change
    add_column :sections, :layout, :string, null: false
  end
end
