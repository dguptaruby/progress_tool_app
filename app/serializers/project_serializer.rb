class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :users, :if => Proc.new{ current_user.admin? } 
  has_many :milestones, :if => Proc.new{ !current_user.admin? }
end
