class Project < ApplicationRecord
  has_many :milestones
  has_many :invitations, dependent: :destroy
  has_many :users, through: :invitations
end
