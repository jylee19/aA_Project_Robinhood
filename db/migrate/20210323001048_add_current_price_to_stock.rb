class AddCurrentPriceToStock < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :current_price, :float
  end
end
