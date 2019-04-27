Rails.application.routes.draw do
	root 'pages#index'
	
	get '/new', to: 'pages#index'

	devise_for :users do
	  get '/users/sign_out', to: 'devise/sessions#destroy'
	end

	resources :pages
	defaults format: :json do
		namespace :api do 
			resources :v1 do
				collection do
					get :get_user
					get :get_institutions
					get :accounts
					post :add_account
					post :delete_account
				end
			end
		end
	end
end
