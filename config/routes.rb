Rails.application.routes.draw do
  get 'home/index'
  get 'home/timestamp'

  root 'home#index'
  resources :frames
  resources :games
  resources :players
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
