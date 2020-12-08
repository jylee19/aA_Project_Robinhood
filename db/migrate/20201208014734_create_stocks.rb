class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :NYSE_abv, null: false
      t.integer :portfolio_id, null: false
      t.integer :holder_id, null: false
      t.float :value, null: false
      t.string :comp_description, null: false
      t.integer :num_trades, null: false

      t.timestamps
    end
    add_index :stocks, :NYSE_abv, unique: true
    add_index :stocks, :portfolio_id, unique: true
    add_index :stocks, :holder_id, unique: true
  end
end
