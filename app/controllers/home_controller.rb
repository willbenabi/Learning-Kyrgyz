class HomeController < ApplicationController
  skip_before_action :set_current_user

  def index
    # Smart redirect: authenticated users go to learning dashboard, others see language selection
    if current_user
      redirect_to '/learning/dashboard'
    else
      render inertia: "Home/LanguageSelect"
    end
  end

  def landing
    # Show landing page (after language is selected)
    render inertia: "Home/Landing"
  end
end
