class Command < Thor		
	require File.expand_path("config/environment.rb")

 	desc "execute", "execute arbitrary code"
	def execute
		account_hash = {
		  account_number: 1234567890,
		  routing_number: 121144612,
		  bank_name: "1ST CAPITAL BANK",
		  bank_nickname: "1ST CAPITAL",
		  bank_address: "1097 S Main St",
		  bank_location: "SALINAS, CA"
		}

		record = Account.create(account_hash)
		if record.persisted?
			accounts = Account.all.pluck
			puts accounts
		end
	end 
end