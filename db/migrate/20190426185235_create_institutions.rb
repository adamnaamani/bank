class CreateInstitutions < ActiveRecord::Migration[6.0]
  def change
    create_table :institutions do |t|
      t.integer :routing_number
      t.string :bank_name
      t.string :bank_nickname
      t.string :bank_address
      t.string :bank_location
      t.string :zip_code
      t.string :phone_number

      t.timestamps
    end
  end
end
