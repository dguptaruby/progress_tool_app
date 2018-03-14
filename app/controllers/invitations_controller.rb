class InvitationsController < Devise::InvitationsController
  before_action :authenticate_user!
  respond_to :html, :json

  def create
    self.resource = invite_resource
    resource_invited = resource.errors.empty?

    yield resource if block_given?

    respond_to do |format|
      format.json {
        if resource_invited
          create_invitation(resource, params[:user][:project_id])
          if is_flashing_format? && self.resource.invitation_sent_at
            set_flash_message :notice, :send_instructions, :email => self.resource.email
          end
        else
          respond_with_navigational(resource) { render :new }
        end
      }
      format.html
    end
  end

  def invite_users_to_list
    project = Project.find(params[:list_id])
    params[:user_ids].each do |id|
      next if project.users.map(&:id).include?(id)
      project.invitations.create(user_id: id, project_id: project.id)
    end
    respond_to do |format|
      format.json {
        render json: { notice: "Successffully invited user" }, status: :ok
      }
    end
  end

  private

  def create_invitation(resource, project_id)
    resource.invitations.create(user_id: resource.id, project_id: project_id)
  end
end