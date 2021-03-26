class AddOpeningPriceToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :opening_price, :float
  end
end
