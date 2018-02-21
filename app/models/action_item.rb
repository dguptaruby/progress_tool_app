class ActionItem < ApplicationRecord
  belongs_to :admin
  belongs_to :user
  has_one :milestone

  validates_presence_of :name, :description
end
