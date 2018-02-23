Rails.application.routes.draw do
  devise_for :users
  
  root 'dashboard#index'
  get 'dashboard/index'
  
  resources :users, only: :index do
    collection do 
      get :get_current_user
    end
  end
  
  resources :status, only: :index

  resources :action_items do
    resources :milestones
  end

  resources :notes
end
