class Admin::DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :require_super_admin

  def index
    render inertia: 'Admin/Dashboard', props: {
      stats: {
        total_users: User.count,
        super_admins: User.where(super_admin: true).count,
        admins: User.where(role: 'admin').count,
        regular_users: User.where(role: 'user').count,
        active_sessions: RefreshToken.active.count
      }
    }
  end

  private

  def require_super_admin
    unless current_user.super_admin?
      render json: { error: 'Unauthorized' }, status: :forbidden
    end
  end
end
