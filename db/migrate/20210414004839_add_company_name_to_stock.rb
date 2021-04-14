class AddCompanyNameToStock < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :company_name, :string
  end
end
