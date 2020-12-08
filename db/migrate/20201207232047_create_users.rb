class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.float :available_liquidity, null: false
      t.integer :portfolio_id, null: false
      t.integer :trades_made_today, null: false
      t.integer :total_trades_made, null: false    
      t.timestamps
    end
    add_index :users, [:username, :email], unique: true
    add_index :users, :email
    add_index :users, :portfolio_id, unique: true
    add_index :users, :session_token, unique: true
  end
end
