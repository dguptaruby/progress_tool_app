class Milestone < ApplicationRecord
  belongs_to :user
  belongs_to :admin
  belongs_to :action_item

  has_many :notes
  has_many_attached :attachments

  validates_presence_of :name, :description

  # enum status: { initial: 0, processing: 1, accepted: 2, denied: 3, canceled: 4 }
end
