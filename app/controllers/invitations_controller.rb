class InvitationsController < Devise::InvitationsController
  respond_to :html, :json

  def create
    self.resource = invite_resource
    resource_invited = resource.errors.empty?

    yield resource if block_given?

    respond_to do |format|
      format.json {
        if resource_invited
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
end