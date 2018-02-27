class Note < ApplicationRecord
  belongs_to :milestone
  belongs_to :user, optional: true
  belongs_to :admin, optional: true

  validates_presence_of :content 
  has_many_attached :attachments

end
