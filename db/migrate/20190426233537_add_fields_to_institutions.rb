class AddFieldsToInstitutions < ActiveRecord::Migration[6.0]
  def change
  	add_column :institutions, :office_code, :string
  	add_column :institutions, :city, :string
  	add_column :institutions, :state, :string
  end
end
