class Admin < User
  has_many :milestones, dependent: :destroy
  has_many :notes, dependent: :destroy
  has_many :action_items, dependent: :destroy

  def admin?
    true
  end
end