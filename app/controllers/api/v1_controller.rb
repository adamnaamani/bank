class Api::V1Controller < ApplicationController
	include Categorizable
	require 'ostruct'
	before_action :authenticate

	def get_user
		render json: { user: @user }
	end

	def get_institutions
		account = JSON.parse(params[:account], object_class: OpenStruct)
		institutions = Institution.where(routing_number: account.routing_number).first

		render json: { institutions: institutions }
	end

	def accounts
		@accounts = Account.all

		render json: { accounts: @accounts }
	end

	def add_account
		@account = current_user.accounts.create!(
    	account_number: permitted_params[:account_number],
	    routing_number: permitted_params[:routing_number],
	    bank_name: permitted_params[:bank_name],
	    bank_nickname: permitted_params[:bank_nickname],
	    bank_address: permitted_params[:bank_address],
	    bank_location: permitted_params[:bank_location]
	  )
		if @account.persisted?
			render json: { status: :ok, account: @account }
		else
			render json: { status: :conflict }
		end
	end

	def delete_account
		account = Account.find_by(id: params[:id], user_id: current_user.id)
		if account.present?
			account.destroy
			render json: { status: :ok }
		else
			render json: { status: :conflict }
		end
	end

	def update_account
		render json: { params: params }
		# account = Account.find_by(id: params[:id], user_id: current_user.id)
		# if account.present?
		# 	account.update(
	 #    	account_number: params[:account_number],
		#     routing_number: params[:routing_number],
		#     bank_name: params[:bank_name],
		#     bank_nickname: params[:bank_nickname],
		#     bank_address: params[:bank_address],
		#     bank_location: params[:bank_location]
		# 	)
		# 	render json: { status: :ok, account: account.to_json }
		# else
		# 	render json: { status: :conflict }
		# end		
	end

	private
	
	def authenticate
		if user_signed_in?
			@user = current_user
		end
	end

	def permitted_params
		params.permit(:format, Categorizable.account_details, Categorizable.institutions)
	end
end
