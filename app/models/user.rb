class User < ApplicationRecord
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  TYPES = ['Admin']

  has_many :notes, dependent: :destroy
  has_many :action_items, dependent: :destroy
  has_many :invitations, dependent: :destroy
  has_many :projects, through: :invitations

  scope :clients,-> { where(type: "User") } 
  
  def admin?
    false
  end
end
