class Account < ApplicationRecord
	belongs_to :user

  validates :account_number, presence: true, uniqueness: true
  validates :routing_number, presence: true
  validates :bank_name, presence: true
  validates :bank_address, presence: true
  validates :bank_location, presence: true
end
