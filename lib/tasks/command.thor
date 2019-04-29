class Command < Thor		
	require File.expand_path("config/environment.rb")
	require 'nokogiri'
	require 'open-uri'	
	require 'net/http'

 	desc "execute", "execute arbitrary code"
	def execute
		account_hash = {
		  account_number: 1234567890,
		  routing_number: 121144612,
		  bank_name: "1ST CAPITAL BANK",
		  bank_nickname: "1ST CAPITAL",
		  bank_address: "1097 S Main St",
		  bank_location: "SALINAS, CA",
		  user_id: 1
		}

		record = Account.create(account_hash)
		if record.persisted?
			accounts = Account.all.pluck
			puts accounts
		end
	end

	desc "fetch", "fetch results from external API"
	def fetch
		site = 'https://routingnumbers.herokuapp.com/state/'
		site_index = 'https://routingnumbers.herokuapp.com/state/index.html'
		document = Nokogiri::HTML(open(site_index))

		@results = []
		document.search('tr').each do |item|
			@results << item.search('td')
		end

		@states = []
		@results.each do |item|
			item_hash = {
				text: item.text.strip.squish,
				href: item.css('a[href]').map {|element| element["href"]}.first
			}
			@states << item_hash
		end

		@institutions = []
		@states.each do |state|
			if state[:href].present?
				Nokogiri::HTML(open(site + state[:href])).search('tr').each do |item|
					item_hash = {
						routing_number: item.css('td:first-child').text.strip.squish,
						bank_name: item.css('td:nth-child(2)').text.strip.squish,
						bank_location: item.css('td:nth-child(3)').text.strip.squish
					}
					if item_hash[:routing_number].present? && item_hash[:routing_number] != 0
						institution = Institution.create(item_hash)
						if institution.persisted?
							@institutions << institution
							puts "Inserted #{institution.routing_number} #{institution.bank_name}"
						end
					end
				end
			end
		end

		puts "Found #{@institutions.size} Banks"
	end

	desc "api", "get results from external API"
	def api
		url = 'https://www.routingnumbers.info/api/data.json?rn='

		Institution.find_each do |institution|
			query = [url, institution.routing_number].join()
			result = JSON.parse(Net::HTTP.get(URI(query)))
			puts result
			institution.update(
				bank_address: result['address'],
				zip_code: result['zip'],
				city: result['city'],
				state: result['state'],
				phone_number: result['telephone'],
				office_code: result['office_code']
			)
		end
	end

	desc "accounts", "create accounts from institutions"
	def accounts
		Institution.limit(10).each_with_index do |institution, index|
			account = Account.create!({
				account_number: 1234567890 + index,
				routing_number: institution.routing_number,
				bank_name: institution.bank_name,
				bank_address: institution.bank_address,
				bank_location: institution.bank_location,
				user_id: 1,
				institution_id: institution.id
			})
			puts "Account #{account.account_number} created."
		end
	end 
end
