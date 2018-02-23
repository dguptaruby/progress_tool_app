class CreateMilestones < ActiveRecord::Migration[5.2]
  def change
    create_table :milestones do |t|
      t.string :name
      t.text :description
      t.integer :admin_id
      t.integer :user_id
      t.integer :action_item_id
      t.date :submission_due_at
      t.date :submitted_at
      t.integer :status_id
      
      t.timestamps
    end
  end
end
