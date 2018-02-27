class MilestonesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_milestone, only: [:update, :destroy, :show, :edit]

  def show
    user = User.find(params[:user_id])
    @milestone = user.milestones.find(params[:id])
    
    data_hash = JbuilderTemplate.new(view_context) do |json|
      json.partial! "milestones/show.json.jbuilder", milestone: @milestone
    end.attributes!

    respond_to do |format|
      format.json {
        render json: data_hash.to_json
      }
      format.html
    end
  end

  def new
    @milestone = Milestone.new
    # render json: @milestone
  end

  def edit
  end

  def index
    user = User.find(params[:user_id])
    @milestones = user.milestones
    
    data_hash = JbuilderTemplate.new(view_context) do |json|
      json.partial! "milestones/index.json.jbuilder", milestones: @milestones
    end.attributes!

    respond_to do |format|
      format.json {
        render json: data_hash.to_json
      }
      format.html
    end
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
    params.require(:milestone).permit(:name, :description, :submission_due_at, :submitted_at, :status_id, :user_id, :admin_id, :action_item_id, attachments: [])
  end

  def set_milestone
    @milestone = Milestone.find(params[:id])
  end
end
