# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_22_153023) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorited_projects", force: :cascade do |t|
    t.integer "project_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_favorited_projects_on_project_id"
    t.index ["user_id"], name: "index_favorited_projects_on_user_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "layout", null: false
    t.string "privacy", null: false
    t.datetime "due_on"
    t.string "color"
    t.integer "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "team_id"
    t.index ["owner_id"], name: "index_projects_on_owner_id"
    t.index ["team_id"], name: "index_projects_on_team_id"
  end

  create_table "sections", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "due_on"
    t.integer "project_id", null: false
    t.integer "assignee_id"
    t.boolean "completed"
    t.datetime "completed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "layout", null: false
    t.index ["assignee_id"], name: "index_sections_on_assignee_id"
    t.index ["project_id"], name: "index_sections_on_project_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "due_on"
    t.integer "project_id"
    t.integer "section_id"
    t.integer "assignee_id"
    t.boolean "completed"
    t.datetime "completed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assignee_id"], name: "index_tasks_on_assignee_id"
    t.index ["project_id"], name: "index_tasks_on_project_id"
    t.index ["section_id"], name: "index_tasks_on_section_id"
  end

  create_table "team_memberships", force: :cascade do |t|
    t.integer "team_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_team_memberships_on_team_id"
    t.index ["user_id", "team_id"], name: "index_team_memberships_on_user_id_and_team_id", unique: true
    t.index ["user_id"], name: "index_team_memberships_on_user_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "privacy"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_teams_on_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "primary_email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "full_name"
    t.string "photo_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pronouns"
    t.string "role"
    t.string "department"
    t.text "about"
    t.index ["primary_email"], name: "index_users_on_primary_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
