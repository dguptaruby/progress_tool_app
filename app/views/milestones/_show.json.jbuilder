# json.array! @milestone do |milestone|
#   json.id milestone.id
#   json.name milestone.name
#   json.description milestone.description
#   json.submission_due_at milestone.submission_due_at
#   json.submitted_at milestone.submitted_at
#   json.user milestone.user.id
#   json.user_full_name milestone.user.full_name
#   json.admin_id milestone.admin.id
#   json.admin_full_name milestone.admin.full_name
#   json.status milestone.status.id
#   json.status_name milestone.status.name
#   json.action_item milestone.action_item.id
#   json.action_item_name milestone.action_item.name

#   json.attachemnts milestone.attachments do |attachment|
#     json.name attachment.filename
#     json.url  url_for(attachment)
#   end
# end

json.extract! @milestone, :id, :name, :description, :submission_due_at, :submitted_at,
  :status_id, :status, :project, :project_id, :created_at

json.attachments @milestone.attachments do |attachment|
  json.name attachment.filename
  json.file_url url_for(attachment)
end