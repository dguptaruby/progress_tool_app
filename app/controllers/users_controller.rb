class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @users = User.clients
    
    data_hash = JbuilderTemplate.new(view_context) do |json|
      json.partial! "users/index.json.jbuilder", users: @users
    end.attributes!

    respond_to do |format|
      format.json {
        render json: data_hash.to_json
      }
      format.html
    end
  end

  def get_current_user
    render status: 200, json: {
      data: current_user, type: current_user.type
    }.to_json
  end

  def show
    @project = Project.find(params[:project_id])
    @user = User.find(params[:id])
    
    data_hash = JbuilderTemplate.new(view_context) do |json|
      json.partial! "users/show.json.jbuilder", locale: { project: @project, user: @user }
    end.attributes!
    
    respond_to do |format|
      format.json {
        render json: data_hash.to_json
      }
      format.html
    end
  end
end
