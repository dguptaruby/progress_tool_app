json.extract! @milestone, :id, :name, :description, :submission_due_at, :submitted_at,
  :status_id, :status, :project, :project_id, :created_at

json.attachments @milestone.attachments do |attachment|
  json.name attachment.filename
  json.file_url url_for(attachment)
end