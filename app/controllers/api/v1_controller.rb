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
	
	def authenticate
		if user_signed_in?
			@user = current_user
		end
	end

	def permitted_params
		params.require(:account).permit(:format, Categorizable.account_details, Categorizable.institutions)
	end
end
