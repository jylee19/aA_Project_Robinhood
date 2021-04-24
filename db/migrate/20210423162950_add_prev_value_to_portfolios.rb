class AddPrevValueToPortfolios < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolios, :prev_close, :float
  end
end
