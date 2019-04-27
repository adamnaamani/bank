class AddUniqueConstraintsToAccounts < ActiveRecord::Migration[6.0]
  def change
  	add_index :accounts, :account_number, unique: true
  end
end
