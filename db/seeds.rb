# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Admin.create(first_name: "Victor", last_name: "Young", email: "victor@progressapp.com", password: "password123", password_confirmation: "password123")

["New", "Open", "In Progress", "Pending", "On Hold", "Completed", "Closed"].each do |status|
  Status.find_or_create_by(name: status)
end