Rails.application.routes.draw do
  devise_for :users, controllers: { 
    registrations: 'devise/registrations',
    invitations: 'invitations' 
  }
  
  root 'dashboard#index'
  get 'dashboard/index'
  
  resources :users, only: :index do
    collection do
      get :get_current_user
    end
  end

  resource :projects do
    resources :milestones do 
      resources :notes
    end
  end
  
  resources :status, only: :index
end