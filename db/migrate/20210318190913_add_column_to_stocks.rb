class AddColumnToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :purchase_price, :float
  end
end
