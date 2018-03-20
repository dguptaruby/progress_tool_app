class NotificationRelayJob < ApplicationJob
  queue_as :default

  def perform(notification)
    json_string = ApplicationController.render partial: "notifications/#{notification.action}", locals: {notification: notification}, formats: [:jbuilder, :json]
    ActionCable.server.broadcast_multiple ["notifications:#{notification.recipient_id}", "notifications:#{notification.notifiable.user_id}"], notification: JSON.parse(json_string)
  end
end
