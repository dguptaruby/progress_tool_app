class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @users = User.clients
    respond_to do |format|
      format.json {
        render json: @users, status: :ok
      }
      format.html {
        @users
      }
    end
  end

  def get_current_user
    render status: 200, json: {
      data: current_user, type: current_user.type
    }.to_json
  end

end
