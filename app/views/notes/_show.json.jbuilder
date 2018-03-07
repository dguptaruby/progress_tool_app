json.extract! @note, :id, :content, :created_at

if @note.user.presence
  json.user @note.user.id
  json.first_name note.user.first_name
    json.last_name note.user.last_name
else
  json.admin_id @note.admin.id
  json.first_name note.admin.first_name
  json.last_name note.admin.last_name
end

json.attachments @note.attachments do |attachment|
  json.name attachment.filename
  json.file_url url_for(attachment)
end