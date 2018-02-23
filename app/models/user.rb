class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  TYPES = ['Admin']

  has_many :notes, dependent: :destroy
  has_many :milestones, dependent: :destroy
  has_many :action_items, dependent: :destroy

  scope :clients,-> { where(type: "User") } 
  
  def admin?
    false
  end
end
