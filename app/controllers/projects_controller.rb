class ProjectsController < ApplicationController
  load_and_authorize_resource
  before_action :authenticate_user!
  before_action :set_project, only: [:update, :destroy, :show, :edit]

  def index
    @projects = Project.accessible_by(current_ability).includes(:users, milestones: [:status])

    if current_user.admin?
      admin_projects(@projects)
    else
      respond_to do |format|
        format.json {
          render json: @projects, status: :ok
        }
        format.html
      end
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

  def admin_projects(projects)
    data_hash = JbuilderTemplate.new(view_context) do |json|
      json.partial! "projects/index.json.jbuilder", projects: projects
    end.attributes!

    respond_to do |format|
      format.json {
        render json: data_hash.to_json
      }
      format.html
    end
  end
end
