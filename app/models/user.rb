class User < ApplicationRecord
  acts_as_reader
  
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  TYPES = ['Admin']

  has_many :notes, dependent: :destroy
  has_many :action_items, dependent: :destroy
  has_many :invitations, dependent: :destroy
  has_many :projects, through: :invitations
  has_many :notifications, foreign_key: :recipient_id

  scope :clients,-> { where(type: "User") } 
  
  def admin?
    false
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
