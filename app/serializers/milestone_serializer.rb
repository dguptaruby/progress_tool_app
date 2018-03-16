class MilestoneSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :submission_due_at, :updated_at, :status_id, :status_name
  belongs_to :status

  def status_name
    object.status.name
  end
end