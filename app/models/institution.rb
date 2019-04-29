class Institution < ApplicationRecord
	has_many :accounts

  validates :routing_number, presence: true, uniqueness: true, length: { is: 9 }
  validates :bank_name, presence: true
end
