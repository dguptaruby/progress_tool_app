class ActionItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_action_item, only: [:update, :destroy, :show, :edit]

  def index
    respond_to do |format|
      format.json {
        render json: ActionItemSerializer.new(ActionItem.all).serialized_json, status: :ok
      }
      format.html
    end
  end

  def show
    render json: @action_item, status: :ok
  end

  def new
  end

  def edit
  end  
  
  def create
    @action_item = ActionItem.new(action_item_params)
    if @action_item.save
      render json: @action_item, status: :created
    else
      render json: @action_item.errors.messages, status: :unprocessable_entity
    end
  end

  def update
    if @action_item.update_attributes(action_item_params)
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

  def action_item_params
    params.require(:action_item).permit(:name, :description, :user_id, :admin_id, :due_at, :submitted_at)
  end

  def set_action_item
    @action_item = ActionItem.find(params[:id])
  end
end
