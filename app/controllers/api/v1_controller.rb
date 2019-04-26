class Api::V1Controller < ApplicationController
	include Categorizable

	def accounts
		@accounts = Account.all

		render json: { accounts: @accounts }
	end

	def add_account
		@account = Account.create(params[:details])
		if @account.persisted?
			render json: { status: :ok, account: @account }
		else
			render json: { status: :conflict }
		end
	end

	def delete_account
	end

	private

	def api_permitted_params
		params.require(:details).permit(Categorizable.account_params)
	end
end
