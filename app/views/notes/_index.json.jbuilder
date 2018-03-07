json.array! @notes do |note|
  json.id note.id
  json.content note.content
  json.note_created_at note.created_at
  json.note_updated_at note.updated_at
  
  if note.user.presence
    json.user note.user.id
    json.first_name note.user.first_name
    json.last_name note.user.last_name
  else
    json.admin_id note.admin.id
    json.first_name note.admin.first_name
    json.last_name note.admin.last_name
  end
  
  json.attachments note.attachments do |attachment|
    json.name attachment.filename
    json.url  url_for(attachment)
  end
end