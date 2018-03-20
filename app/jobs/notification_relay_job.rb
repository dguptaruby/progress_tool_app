class NotificationRelayJob < ApplicationJob
  queue_as :default

  def perform(notification)
    json_string = ApplicationController.render partial: "notifications/#{notification.action}", locals: {notification: notification}, formats: [:jbuilder, :json]
    ActionCable.server.broadcast "notifications:#{notification.recipient_id}", notification: JSON.parse(json_string)
    ActionCable.server.broadcast "notifications:#{notification.notifiable.user_id}", notification: JSON.parse(json_string)
  end
end
