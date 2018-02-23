class CreateActionItems < ActiveRecord::Migration[5.2]
  def change
    create_table :action_items do |t|
      t.string :name
      t.text :description
      t.integer :user_id
      t.integer :admin_id
      t.date :due_at
      t.date :submitted_at

      t.timestamps
    end
  end
end
