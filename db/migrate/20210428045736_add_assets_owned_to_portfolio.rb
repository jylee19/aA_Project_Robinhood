class AddAssetsOwnedToPortfolio < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolios, :assets_owned, :string, array: true, default: []
  end
end
