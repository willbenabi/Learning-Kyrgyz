class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    render inertia: 'Dashboard', props: {
      stats: {
        users_count: User.count,
        active_sessions: RefreshToken.active.count
      }
    }
  end
end
