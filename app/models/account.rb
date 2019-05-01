class Account < ApplicationRecord
	belongs_to :user
	belongs_to :institution

  validates :account_number, presence: true, uniqueness: true, length: { maximum: 10 }
  validates :routing_number, presence: true, length: { is: 9 }
  validates :bank_name, presence: true
  validates :bank_address, presence: true
  validates :bank_location, presence: true
end
