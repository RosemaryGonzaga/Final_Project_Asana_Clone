class ChangeFullNameInUsers < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :full_name, true
  end
end
