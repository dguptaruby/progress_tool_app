json.extract! @note, :id, :content, :created_at

if @note.user.presence
  json.user @note.user.id
  json.user_full_name @note.user.full_name
else
  json.admin_id @note.admin.id
  json.admin_full_name @note.admin.full_name
end

json.attachments @note.attachments do |attachment|
  json.name attachment.filename
  json.file_url url_for(attachment)
end