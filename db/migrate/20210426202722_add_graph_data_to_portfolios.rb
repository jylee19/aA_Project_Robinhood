class AddGraphDataToPortfolios < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolios, :graph_data, :string, array: true, default: []
  end
end
