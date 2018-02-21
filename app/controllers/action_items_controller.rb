class ActionItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_action_item, only: [:update, :destroy, :show]

  def show
    render json: @action_item, status: :ok
  end

  def create
    @action_item = Milestone.new(milestone_params)
    if @action_item.save
      render json: @action_item, status: :created
    else
      render json: @action_item.errors.messages, status: :unprocessable_entity
    end
  end

  def update
    if @action_item.update_attributes(milestone_params)
      render json: @action_item, status: :ok
    else
      render json: @action_item.errors.messages, status: :unprocessable_entity
    end
  end

  def destroy
    @action_item.destroy
    head :no_content
  end

  private

  def milestone_params
    params.require(:action_item).permit(:name, :description, :due_at, :submitted_at, :user_id, :admin_id)
  end

  def set_action_item
    @action_item = ActionItem.find(params[:id])
  end
end
