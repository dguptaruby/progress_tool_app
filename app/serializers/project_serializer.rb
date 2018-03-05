class ProjectSerializer
  include FastJsonapi::ObjectSerializer
  set_type :project  # optional
  attributes :id, :name, :description
  has_many :milestones
end

