class AddFundsToPortfolio < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolios, :funds, :float
    remove_column :users, :available_liquidity
  end
end
