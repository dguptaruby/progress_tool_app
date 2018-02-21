class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  TYPES = ['Admin']

  has_many :notes, dependent: :destroy
  has_many :milestones, dependent: :destroy
  has_many :action_items, dependent: :destroy

  def admin?
    false
  end
end
