class AddProjectToMilestones < ActiveRecord::Migration[5.2]
  def change
    add_column :milestones, :project_id, :integer, index: true
  end
end
