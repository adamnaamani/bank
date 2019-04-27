class AddInstitutionReferenceToAccounts < ActiveRecord::Migration[6.0]
  def change
  	add_reference :accounts, :institution, foreign_key: true
  end
end
