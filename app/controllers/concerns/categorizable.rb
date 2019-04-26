module Categorizable
	extend ActiveSupport::Concern

	def self.account_details
    [
    	:account_number,
	    :routing_number,
	    :bank_name,
	    :bank_nickname,
	    :bank_address,
	    :bank_location
  	]
	end
end