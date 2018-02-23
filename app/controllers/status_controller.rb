class StatusController < ApplicationController
  before_action :authenticate_user!

  def index
    render status: 200, json: {
      data: Status.all
    }.to_json
  end
end
