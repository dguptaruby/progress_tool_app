Rails.application.routes.draw do
  devise_for :users
  
  root 'dashboard#index'
  get 'dashboard/index'
  
  resources :users, only: :index do
    collection do
      get :get_current_user
    end

    resources :milestones
  end
  
  resources :status, only: :index

  resources :action_items

  # get '/action_items/:action_item_id/milestones/:id/view', to: 'milestones#view'

  resources :notes
end
