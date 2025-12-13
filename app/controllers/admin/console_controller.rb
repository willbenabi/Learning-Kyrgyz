class Admin::ConsoleController < Admin::BaseController
  after_action :verify_authorized

  def index
    authorize :console, :index?
    total_users = User.count
    admins = User.where(admin: true).count

    render inertia: "Admin/Console", props: {
      stats: {
        total_users: total_users,
        admins: admins,
        regular_users: total_users - admins,
        active_sessions: RefreshToken.active.count
      },
      breadcrumbs: [
        { label: 'Admin' }
      ]
    }
  end
end
