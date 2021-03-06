module Tokenable
  extend ActiveSupport::Concern
  require 'jwt'

  def self.encode(payload, exp = 365.days.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def self.decode(token)
    body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    HashWithIndifferentAccess.new body
  end  
end
