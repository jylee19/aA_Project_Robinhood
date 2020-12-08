class CreateHolders < ActiveRecord::Migration[5.2]
  def change
    create_table :holders do |t|
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :holders, :user_id, unique: true
  end
end
