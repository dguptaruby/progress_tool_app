class Milestone < ApplicationRecord
  belongs_to :project
  belongs_to :status

  has_many :notes
  has_many_attached :attachments

  validates_presence_of :name, :description

  def milestone_detail
    { id: id,
      name: name,
      project_id: project_id,
      status_id: status_id,
      status_name: status.name,
      description: description,
      submission_due_at: submission_due_at,
      submitted_at: submitted_at
    }
  end
end
