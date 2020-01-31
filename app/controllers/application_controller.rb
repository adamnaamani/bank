class ApplicationController < ActionController::Base
	include Authenticatable
	include Authorizable
	include Categorizable
end
