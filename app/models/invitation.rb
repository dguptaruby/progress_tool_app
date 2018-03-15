class Invitation < ApplicationRecord
  belongs_to :project, inverse_of: :invitations
  belongs_to :user, inverse_of: :invitations
end
