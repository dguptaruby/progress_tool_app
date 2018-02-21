class Note < ApplicationRecord
  belongs_to :milestone
  belongs_to :user
  belongs_to :admin

  validates_presence_of :content 
end
