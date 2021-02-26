class ChangeStocksTable < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :number, :float
  end
end
