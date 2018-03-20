Rails.application.routes.draw do
  devise_for :users, controllers: { 
    registrations: 'devise/registrations',
    invitations: 'invitations' 
  }

  devise_scope :user do
    post '/invitation/invite_users_to_list' => 'invitations#invite_users_to_list'
    resources :notifications do
      collection do
        get :mark_all_as_read
        get :all_notifications
      end
    end
  end
  
  root 'dashboard#index'
  get 'dashboard/index'
  
  resources :users, only: [:index, :show] do
    collection do
      get :get_current_user
    end
  end

  resources :projects do
    resources :milestones do 
      resources :notes
    end
  end
  
  resources :status, only: :index
  mount ActionCable.server, at: '/cable'
end