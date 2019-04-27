class AddUniqueConstraintToInstitutions < ActiveRecord::Migration[6.0]
  def change
  	add_index :institutions, :routing_number, unique: true
  end
end
