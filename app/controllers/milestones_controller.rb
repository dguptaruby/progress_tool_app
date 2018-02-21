class MilestonesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_milestone, only: [:update, :destroy, :show]

  def show
    render json: @milestone, status: :ok
  end

  def index
    render json: Milestone.all, status: :ok
  end

  def create
    @milestone = Milestone.new(milestone_params)
    if @milestone.save
      render json: @milestone, status: :created
    else
      render json: @milestone.errors.messages, status: :unprocessable_entity
    end
  end

  def update
    if @milestone.update_attributes(milestone_params)
      render json: @milestone, status: :ok
    else
      render json: @milestone.errors.messages, status: :unprocessable_entity
    end
  end

  def destroy
    @milestone.destroy
    head :no_content
  end

  private

  def milestone_params
    params.require(:milestone).permit(:name, :description, :submission_due_at, :submitted_at, :status, :user_id, :admin_id, attachments: [])
  end

  def set_milestone
    @milestone = Milestone.find(params[:id])
  end
end
