module Categorizable
	extend ActiveSupport::Concern

	def self.account_details
    %i[
				account_number
				routing_number
				bank_name
				bank_nickname
				bank_address
				bank_location
			]
	end

	def self.institutions
		%i[
				routing_number
				bank_name
				bank_nickname
				bank_address
				bank_location
				zip_code
				phone_number
				office_code
				city
				state
			]
	end
end