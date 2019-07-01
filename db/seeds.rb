# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Project.destroy_all
Section.destroy_all
Task.destroy_all
Team.destroy_all

User.create!({
    primary_email: "user1@shavasana.com",
    password: "password",
})

user1 = User.first

Team.create!({
  name: "Brooklyn",
})

team1 = Team.first

TeamMembership.create!({
  team_id: team1.id,
  user_id: user1.id,
})

Project.create!({
    name: "Project Shavasana",
    description: "Shavasana is a project management tool inspired by Asana. These tasks outline how to build out its features",
    layout: "list",
    privacy: "public",
    due_on: nil,
    color: nil,
    owner_id: user1.id,
    team_id: team1.id,
})

# Project.create!({
#     name: "Acknowledgements",
#     description: "",
#     layout: "list",
#     privacy: "public",
#     due_on: nil,
#     color: nil,
#     owner_id: user1.id,
# })

project1 = Project.first
# project2 = Project.second

Section.create!({
  name: "To Do",
  description: "",
  due_on: nil,
  project_id: project1.id,
  assignee_id: user1.id,
  completed: false,
  completed_at: nil,
  layout: "list"
})

Section.create!({
  name: "In Progress",
  description: "",
  due_on: nil,
  project_id: project1.id,
  assignee_id: user1.id,
  completed: false,
  completed_at: nil,
  layout: "list"
})

Section.create!({
  name: "Done",
  description: "",
  due_on: nil,
  project_id: project1.id,
  assignee_id: user1.id,
  completed: false,
  completed_at: nil,
  layout: "list"
})

section1 = Section.first
section2 = Section.second
section3 = Section.third
Task.create!({
  name: "Teams",
  description: "",
  due_on: nil,
  project_id: project1.id,
  section_id: section1.id,
  assignee_id: user1.id,
  completed: nil,
  completed_at: nil,
})

Task.create!({
  name: "Profiles",
  description: "",
  due_on: nil,
  project_id: project1.id,
  section_id: section1.id,
  assignee_id: user1.id,
  completed: nil,
  completed_at: nil,
})

Task.create!({
  name: "Beef up Tasks",
  description: "",
  due_on: nil,
  project_id: project1.id,
  section_id: section2.id,
  assignee_id: user1.id,
  completed: nil,
  completed_at: nil,
})

Task.create!({
  name: "Present Shavasana",
  description: "",
  due_on: nil,
  project_id: project1.id,
  section_id: section2.id,
  assignee_id: user1.id,
  completed: nil,
  completed_at: nil,
})

# Section.create!({
#   name: "THANK YOU",
#   description: "",
#   due_on: nil,
#   project_id: project2.id,
#   assignee_id: user1.id,
#   completed: false,
#   completed_at: nil,
#   layout: "list"
# })

