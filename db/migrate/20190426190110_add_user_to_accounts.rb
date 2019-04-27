class AddUserToAccounts < ActiveRecord::Migration[6.0]
  def change
    add_reference :accounts, :user, foreign_key: true
  end
end
