class RemoveIndexStockAbv < ActiveRecord::Migration[5.2]
  def change
      remove_index :stocks, :NYSE_abv
  end
end
