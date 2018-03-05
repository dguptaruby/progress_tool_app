json.array! @milestones do |milestone|
  json.id milestone.id
  json.name milestone.name
  json.description milestone.description
  json.submission_due_at milestone.submission_due_at
  json.submitted_at milestone.submitted_at
  json.project milestone.project.id
  json.project_name milestone.project.name
  json.status milestone.status.id
  json.status_name milestone.status.name

  json.attachemnts milestone.attachments do |attachment|
    json.name attachment.filename
    json.url  url_for(attachment)
  end
end