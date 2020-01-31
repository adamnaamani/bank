module Api
  module V1
    class AccountsController < ApplicationController
      def index
        @accounts = Account.where(user_id: @user.id).order(created_at: :desc)

        render json: { accounts: @accounts }
      end

      def create
        @account = @user.accounts.create(permitted_params)
        if @account.persisted?
          render json: { status: :ok, account: @account }
        else
          render json: { status: :conflict, errors: @account.errors }
        end
      end

      def update
        account = Account.find_by(id: params[:id], user_id: @user.id)
        if account.present?
          account.update(permitted_params)
          render json: { status: :ok, account: account }
        else
          render json: { status: :conflict }
        end	
      end

      def destroy
        account = Account.find_by(id: params[:id], user_id: @user.id)
        if account.present?
          account.destroy
          render json: { status: :ok }
        else
          render json: { status: :conflict }
        end
      end

      private

      def permitted_params
        params.permit(Categorizable.account_details)
      end
    end
  end
end