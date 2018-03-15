class Ability
  include CanCan::Ability

  attr_reader :user

  def initialize(user)
    @user = user
    return can :manage, :all if user.admin?

    user_permissions
  end

  private

  def user_permissions
    can :read, Project, invitations: { user_id: user.id }
    can :read, Milestone
  end
end
