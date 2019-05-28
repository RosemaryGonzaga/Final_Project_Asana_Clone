class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :primary_email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :full_name, null: false
      t.string :photo_url
      t.timestamps
    end
    add_index :users, :primary_email, unique: true
    add_index :users, :session_token, unique: true
  end
end