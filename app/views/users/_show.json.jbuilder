json.extract! @project, :id, :name, :description, :created_at

milestone_ids = @user.notes.map(&:milestone_id).uniq
user_milestones = Milestone.where(id: milestone_ids)
json.first_name @user.first_name
json.last_name @user.last_name
json.email @user.email
json.user_created_at @user.created_at

json.milestones user_milestones do |milestone|
  json.name milestone.name
  json.description milestone.description
  json.submission_due_at milestone.submission_due_at
  json.status_id milestone.status_id
  json.status_name milestone.status.name
  json.updated_at milestone.updated_at
end