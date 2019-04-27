class Institution < ApplicationRecord
	validates :routing_number, presence: true, uniqueness: true
end
