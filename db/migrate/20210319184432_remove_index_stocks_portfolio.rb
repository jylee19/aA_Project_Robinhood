class RemoveIndexStocksPortfolio < ActiveRecord::Migration[5.2]
  def change
    remove_index :stocks, :portfolio_id
  end
end
