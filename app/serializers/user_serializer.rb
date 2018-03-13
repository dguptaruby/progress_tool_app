class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :created_at, :milestone

  def milestone
    milestone_ids = @object.notes.map(&:milestone_id).uniq
    milestones = Milestone.where(id: milestone_ids)
    milestones.collect do |milestone|
      milestone.milestone_detail
    end
  end
end
