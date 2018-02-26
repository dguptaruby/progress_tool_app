class ActionItemSerializer
  include FastJsonapi::ObjectSerializer
  set_type :action_item  # optional
  attributes :id, :name, :description, :user, :admin, :due_at, :submitted_at
  has_one :milestone
  belongs_to :admin
  belongs_to :user
end

