class CreateAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.integer :account_number
      t.integer :routing_number
      t.string :bank_name
      t.string :bank_nickname
      t.string :bank_address
      t.string :bank_location

      t.timestamps
    end
  end
end
