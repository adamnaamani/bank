class Api::V1Controller < ApplicationController
	def accounts
		accounts = Account.all

		render json: { accounts: accounts }
	end

	def add_account
	end

	def delete_account
	end

	private

	def api_permitted_params
	end
end
