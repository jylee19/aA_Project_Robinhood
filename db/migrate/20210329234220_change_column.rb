class ChangeColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :stocks, :opening_price, :previous_close
  end
end
