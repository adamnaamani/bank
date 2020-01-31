Rails.application.routes.draw do
	root 'pages#index'
	
	get '/dashboard', to: 'pages#index'
	get '/new', to: 'pages#index'

	devise_for :users do
	  get '/users/sign_out', to: 'devise/sessions#destroy'
	end
	
	defaults format: :json do
		namespace :api do 
			namespace :v1 do
				resources :accounts
				resources :institutions
				resources :users
			end
		end
	end
end
