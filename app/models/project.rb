class Project < ApplicationRecord
  belongs_to :admin

  has_many :milestones, dependent: :destroy
  has_many :invitations
  has_many :users, through: :invitations
end
