Rails.application.routes.draw do
	root 'pages#index'

	devise_for :users
	resources :pages
	defaults format: :json do
		namespace :api do 
			resources :v1 do
				collection do
					get :accounts
					post :add_account
					post :delete_account
				end
			end
		end
	end
end
