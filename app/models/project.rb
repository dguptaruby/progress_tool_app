class Project < ApplicationRecord
  has_many :milestones
  has_many :users, through: :invitations
end
