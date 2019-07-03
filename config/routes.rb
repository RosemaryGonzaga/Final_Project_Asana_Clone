Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:new, :create, :index]
    resource :session, only: [:new, :create, :destroy]
    resources :projects, except: [:new, :edit]
    resources :sections, except: [:new, :edit]  # hopefully this doesn't need to be nested!
    resources :tasks, except: [:new, :edit]     # hopefully this doesn't need to be nested!
    resources :teams, except: [:new, :edit]
    # resources :team_memberships, only: [:index, :create, :destroy]
    resources :team_memberships, only: [:create, :destroy]
  end

end
