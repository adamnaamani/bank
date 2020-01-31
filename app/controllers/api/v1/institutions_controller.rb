module Api
  module V1
    class InstitutionsController < ApplicationController
      def index
        account = JSON.parse(params[:account], object_class: OpenStruct)
        institutions = Institution.where(routing_number: account.routing_number).first
    
        render json: { institutions: institutions }
      end
    end
  end
end