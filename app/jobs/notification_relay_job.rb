class NotificationRelayJob < ApplicationJob
  queue_as :default

  def perform(notification, invitation)
    html = ApplicationController.render partial: "notifications/#{notification.action}", locals: {notification: notification, invitation: invitation}, formats: [:html]
    ActionCable.server.broadcast "notifications:#{notification.recipient_id}", html: html
  end
end
