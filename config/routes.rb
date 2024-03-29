Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, default: { format: :json } do
    resources :users, only: [:create, :update, :show]
    resources :portfolios, only: [:create, :update, :show, :destroy]
    resource :session, only: [:create, :destroy]
    resources :stocks, only: [:show, :create, :destroy, :update]
  end

  root "static_pages#root"

end
