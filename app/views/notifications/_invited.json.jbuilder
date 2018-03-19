json.extract! notification, :actor_id, :recipient_id, :read_at, :action, :notifiable_id,
  :notifiable_type, :created_at

json.actor_name notification.actor.full_name
json.invited_user_name notification.notifiable.user.full_name
json.user_id notification.notifiable.user_id
json.project_id notification.notifiable.project_id
json.project_name notification.notifiable.project.name