Rails.application.routes.draw do
  # Letter Opener Web (development only)
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Authentication routes
  get "/login", to: "sessions#new", as: :login
  get "/register", to: "registrations#new", as: :register
  post "/register", to: "registrations#create"
  resource :session, only: [ :create, :destroy ] do
    post :refresh, on: :collection
  end

  # Password reset routes
  namespace :password do
    get :forgot, to: "reset#new"
    post :forgot, to: "reset#forgot"
    get :reset, to: "reset#show"
    put :reset, to: "reset#update"
  end

  # Invitation routes (public)
  get "/invitations/:token", to: "invitations#show", as: :accept_invitation
  post "/invitations/:token/accept", to: "invitations#accept"

  # Onboarding routes (public)
  get "/onboarding/language", to: "onboarding#language"
  post "/onboarding/language", to: "onboarding#set_language"
  get "/onboarding/level-choice", to: "onboarding#level_choice"
  get "/onboarding/placement-test", to: "onboarding#placement_test"
  post "/onboarding/placement-test/results", to: "onboarding#submit_test"
  get "/onboarding/diagnostics", to: "onboarding#diagnostics"

  # Learning routes (public for Level 1)
  get "/learning/dashboard", to: "learning#dashboard"
  get "/learning/grammar", to: "learning#grammar"
  get "/learning/reading", to: "learning#reading"
  get "/learning/writing", to: "learning#writing"
  get "/learning/vocabulary", to: "learning#vocabulary"

  # Progress tracking routes
  get "/learning/progress", to: "learning/progress#index"
  namespace :learning do
    resource :progress, only: [:show] do
      post :complete_lesson, on: :collection
      post :add_vocabulary, on: :collection
      post :update_level, on: :collection
    end
  end

  # Profile routes (authenticated users)
  resource :profile, only: [ :show, :edit, :update ]

  # Admin routes (super_admin only)
  namespace :admin do
    resources :users do
      member do
        post :resend_invitation
      end
    end
    resources :audit_logs, only: [ :index ]
    get :console, to: "console#index"
  end

  # Dashboard (authenticated users)
  get :dashboard, to: "dashboard#index"

  # Root path - smart redirect based on authentication
  root to: "home#index"

  # Example Inertia route (can be removed later)
  get "inertia-example", to: "inertia_example#index"
end
