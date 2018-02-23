class Milestone < ApplicationRecord
  belongs_to :user
  belongs_to :admin
  belongs_to :action_item

  has_many :notes
  has_many_attached :attachments

  validates_presence_of :name, :description
end
