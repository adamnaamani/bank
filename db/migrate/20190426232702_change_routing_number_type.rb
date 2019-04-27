class ChangeRoutingNumberType < ActiveRecord::Migration[6.0]
  def change
  	change_column :institutions, :routing_number, :string
  	change_column :accounts, :routing_number, :string
  end
end
