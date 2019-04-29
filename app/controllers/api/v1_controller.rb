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
		@accounts = Account.where(user_id: @user.id).order(created_at: :desc)

		render json: { accounts: @accounts }
	end

	def add_account
		@account = @user.accounts.create(
    	account_number: params[:account_number],
	    routing_number: params[:routing_number],
	    bank_name: params[:bank_name],
	    bank_nickname: params[:bank_nickname],
	    bank_address: params[:bank_address],
	    bank_location: params[:bank_location],
	    institution_id: params[:id]
	  )
		if @account.persisted?
			render json: { status: :ok, account: @account }
		else
			render json: { status: :conflict, errors: @account.errors }
		end
	end

	def delete_account
		account = Account.find_by(id: params[:id], user_id: @user.id)
		if account.present?
			account.destroy
			render json: { status: :ok }
		else
			render json: { status: :conflict }
		end
	end

	def update_account
		account = Account.find_by(id: params[:id], user_id: @user.id)
		if account.present?
			account.update(
	    	account_number: params[:account_number],
		    routing_number: params[:routing_number],
		    bank_name: params[:bank_name],
		    bank_nickname: params[:bank_nickname],
		    bank_address: params[:bank_address],
		    bank_location: params[:bank_location]
			)
			render json: { status: :ok, account: account }
		else
			render json: { status: :conflict }
		end		
	end

	private
	
	def authenticate
		if user_signed_in?
			@user = current_user
		else
			render json: { status: :unauthorized }
		end
	end

	def permitted_params
		params.permit(:format, Categorizable.account_details, Categorizable.institutions)
	end
end
