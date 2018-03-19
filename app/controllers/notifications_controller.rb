class NotificationsController < ApplicationController
  before_action :authenticate_user!

  def index
    @unread_notifications = current_user.notifications.unread
    
    data_hash = JbuilderTemplate.new(view_context) do |json|
      json.partial! "notifications/index.json.jbuilder", unread_notifications: @unread_notifications
    end.attributes!

    respond_to do |format|
      format.json {
        render json: data_hash.to_json
      }
      format.html
    end
  end
end
