class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:update, :destroy, :show, :edit]

  def index
    respond_to do |format|
      format.json {
        render json: ProjectSerializer.new(Project.all).serialized_json, status: :ok
      }
      format.html
    end
  end

  def show
    render json: @project, status: :ok
  end

  def new
  end

  def edit
  end  
  
  def create
    @project = Project.new(project_params)
    if @project.save
      render json: @project, status: :created
    else
      render json: @project.errors.messages, status: :unprocessable_entity
    end
  end

  def update
    if @project.update_attributes(project_params)
      render json: @project, status: :ok
    else
      render json: @project.errors.messages, status: :unprocessable_entity
    end
  end

  def destroy
    @project.destroy
    head :no_content
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :admin_id)
  end

  def set_project
    @project = Project.find(params[:id])
  end
end
