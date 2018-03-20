json.extract! @project, :id, :name, :description, :created_at

json.milestones @project.milestones do |milestone|
  json.name milestone.name
  json.description milestone.description
  json.submission_due_at milestone.submission_due_at
  json.status_id milestone.status_id
  json.status_name milestone.status.name
  json.updated_at milestone.updated_at
end