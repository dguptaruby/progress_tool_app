Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  
  resources :milestones
  resources :action_items
  resources :notes
end
