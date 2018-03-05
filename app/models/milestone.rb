class Milestone < ApplicationRecord
  belongs_to :project
  belongs_to :status

  has_many :notes
  has_many_attached :attachments

  validates_presence_of :name, :description
end
