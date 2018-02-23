class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def index
    render status: 200, json: {
      data: User.clients
    }.to_json
  end

  def get_current_user
    render status: 200, json: {
      data: current_user
    }.to_json
  end

end
