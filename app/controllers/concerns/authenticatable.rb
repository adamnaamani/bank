module Authenticatable
  extend ActiveSupport::Concern

  included do
  	include Tokenable
  	protect_from_forgery with: :exception
  	before_action :authenticate_user!
  	before_action :retrieve_headers, :validate_request, only: [:add_account]
  end

  private

  def retrieve_headers
    if request.headers['Authorization'].present?
      @authorization_header = request.headers['Authorization'].split(' ').last
    end
  end

  def validate_request
  	if @authorization_header.present?
	  	@user = User.find_by(auth_token: @authorization_header)
	  	if @user.present?
	  		@user.attributes[:decoded_token] = Tokenable.decode(@authorization_header)
	  	else
	  		render json: { status: :unauthorized }
	  	end
	  else
	  	render json: { status: :unauthorized }
	  end
  end 
end