class NotificationsController < ApplicationController
  before_action :authenticate_user!

  def index
    @unread_notifications = Notification.unread_by(current_user)
    
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

  def mark_all_as_read
    Notification.mark_as_read! :all, for: current_user
  end

  def all_notifications
    if current_user.admin?
      @notifications = current_user.notifications
    else
      @notifications = Notification.includes(:notifiable, notifiable: [:user]).collect{|notification| notification if notification.notifiable.user.eql? current_user}.compact
    end
    data_hash = JbuilderTemplate.new(view_context) do |json|
      json.partial! "notifications/collection_all.json.jbuilder", notifications: @notifications
    end.attributes!

    respond_to do |format|
      format.json {
        render json: data_hash.to_json
      }
      format.html
    end
  end
end
