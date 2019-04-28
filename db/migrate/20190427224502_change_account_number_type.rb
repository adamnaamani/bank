class ChangeAccountNumberType < ActiveRecord::Migration[6.0]
  def change
  	change_column :accounts, :account_number, :string
  end
end
