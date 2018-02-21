class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.text :content
      t.integer :admin_id
      t.integer :user_id
      t.integer :milestone_id
      
      t.timestamps
    end
  end
end
