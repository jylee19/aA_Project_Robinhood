class RemoveExtraColumnsFromStocks < ActiveRecord::Migration[5.2]
  def change
    remove_column :stocks, :num_trades, :integer
    remove_column :stocks, :holder_id, :integer
    change_column_null :stocks, :portfolio_id, true
  end
end
