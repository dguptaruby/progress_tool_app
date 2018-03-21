class AdminMailer < ApplicationMailer
  default from: "no-reply@progressapp.com"

  ADMIN = "admin.progress@yopmail.com"

  def notify_admin_about_invitation(invited_user_name, invited_user_email, actor_full_name, actor_email, project_name, actor_id, invited_user_id, project_id)
    @invited_user_full_name = invited_user_name
    @invited_user_email = invited_user_email
    @actor_full_name = actor_full_name
    @actor_email = actor_email
    @project_name = project_name
    @actor_id = actor_id
    @invited_user_id = invited_user_id
    @project_id = project_id

    mail(to: ADMIN, subject: "#{@actor_full_name} invited #{@invited_user_full_name} to #{@project_name}.")
  end
end
