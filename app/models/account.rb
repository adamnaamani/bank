class Account < ApplicationRecord
	belongs_to :user
	belongs_to :institution

  validates :account_number, presence: true, uniqueness: true, length: { maximum: 10 }
  validates :routing_number, presence: true, length: { is: 9 }
  validates :bank_name, presence: true
  validates :bank_address, presence: true
  validates :bank_location, presence: true

	def bank_name
    self[:bank_name].humanize.gsub(/\b('?[a-z])/) { $1.capitalize } if self[:bank_name].present?
  end	

	def bank_address
    self[:bank_address].humanize.gsub(/\b('?[a-z])/) { $1.capitalize } if self[:bank_address].present?
  end

	def bank_location
    self[:bank_location].humanize.gsub(/\b('?[a-z])/) { $1.capitalize } if self[:bank_location].present?
  end    
end
