Rails.application.routes.draw do
  devise_for :users
  root 'hello_angular#index'
  get 'hello_angular/index'
  
  resources :milestones
  resources :action_items
  resources :notes
end
