Rails.application.routes.draw do
  resources :job_states
  resources :jobs
  resources :users
  resources :companies

  post '/login', to: 'users#login' 
  post '/companylogin', to: 'companies#login'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
