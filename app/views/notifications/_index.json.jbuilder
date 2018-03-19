json.array! @unread_notifications do |notification|
  json.id notification.id
  json.action notification.action
  json.actor_id notification.actor_id
  json.recipient_id notification.recipient_id
  json.read_at notification.read_at
  json.notifiable_id notification.notifiable_id
  json.type notification.notifiable_type
  json.created_at notification.created_at

  json.actor_name notification.actor.full_name
  json.invited_user_name notification.notifiable.user.full_name
  json.user_id notification.notifiable.user_id
  json.project_name notification.notifiable.project.name
  json.project_id notification.notifiable.project_id
end