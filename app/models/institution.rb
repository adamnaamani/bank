class Institution < ApplicationRecord
	has_many :accounts

  validates :routing_number, presence: true, uniqueness: true, length: { maximum: 9 }
end
