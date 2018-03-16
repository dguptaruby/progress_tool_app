json.array! @projects do |project|
  json.id project.id
  json.name project.name
  json.description project.description

  json.users project.users do |user|
    json.id user.id
    json.first_name user.first_name
    json.last_name user.last_name
    json.email user.email
    json.created_at user.created_at

    milestone_ids = user.notes.map(&:milestone_id).uniq
    milestones = Milestone.where(id: milestone_ids, project_id: project.id)
    
    json.milestones milestones.collect do |milestone|
      json.id milestone.id
      json.name milestone.name
      json.project_id milestone.project_id
      json.status_id milestone.status_id
      json.status_name milestone.status.name
      json.description milestone.description
      json.submission_due_at milestone.submission_due_at
      json.submitted_at milestone.submitted_at
      json.updated_at milestone.updated_at
    end
  end
end
