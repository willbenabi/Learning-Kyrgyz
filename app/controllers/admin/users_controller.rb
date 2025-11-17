class Admin::UsersController < Admin::BaseController
  before_action :set_user, only: [ :show, :edit, :update, :destroy ]

  after_action :verify_authorized
  after_action :verify_policy_scoped, only: :index

  def index
    authorize User

    # Start with base scope
    @users = policy_scope(User)

    # Apply status filter (simple where clause)
    if params[:status_filter].present? && params[:status_filter] != "all"
      case params[:status_filter]
      when "active"
        @users = @users.where.not(password_digest: nil)
      when "pending"
        @users = @users.where.not(invitation_sent_at: nil).where(invitation_accepted_at: nil)
      when "inactive"
        @users = @users.where(password_digest: nil, invitation_sent_at: nil)
      end
    end

    # Use Ransack for search and date range only
    search_params = {}

    if params[:search].present?
      search_params[:name_or_email_cont] = params[:search]
    end

    if params[:created_from].present?
      search_params[:created_at_gteq] = Date.parse(params[:created_from]).beginning_of_day
    end

    if params[:created_to].present?
      search_params[:created_at_lteq] = Date.parse(params[:created_to]).end_of_day
    end

    @q = @users.ransack(search_params)
    @users = @q.result

    # Apply sorting with ActiveRecord (supports NULLS LAST if needed in future)
    sort_column = params[:sort] || "created_at"
    sort_direction = params[:direction] || "desc"
    @users = @users.order("#{sort_column} #{sort_direction}")

    @pagy, @users = pagy(@users, items: 20)

    render inertia: "Admin/Users/Index", props: {
      users: @users.map { |u| user_props(u) },
      pagination: pagination_props(@pagy),
      filters: {
        search: params[:search].presence,
        sort: sort_column,
        direction: sort_direction,
        status_filter: params[:status_filter].presence,
        created_from: params[:created_from].presence,
        created_to: params[:created_to].presence
      },
      breadcrumbs: [
        { label: 'Admin', href: '/admin/console' },
        { label: 'Users' }
      ]
    }
  end

  def show
    authorize @user
    render inertia: "Admin/Users/Show", props: {
      user: user_props(@user),
      breadcrumbs: [
        { label: 'Admin', href: '/admin/console' },
        { label: 'Users', href: '/admin/users' },
        { label: @user.name }
      ]
    }
  end

  def new
    @user = User.new
    authorize @user
    render inertia: "Admin/Users/New", props: {
      breadcrumbs: [
        { label: 'Admin', href: '/admin/console' },
        { label: 'Users', href: '/admin/users' },
        { label: 'New' }
      ]
    }
  end

  def create
    authorize User

    outcome = Invitations::SendInvitation.run(
      current_user: current_user,
      email: params[:user][:email],
      name: params[:user][:name]
    )

    if outcome.valid?
      redirect_to admin_users_path, notice: "Invitation sent successfully to #{outcome.result.email}"
    else
      render inertia: "Admin/Users/New", props: {
        errors: outcome.errors.messages,
        breadcrumbs: [
          { label: 'Admin', href: '/admin/console' },
          { label: 'Users', href: '/admin/users' },
          { label: 'New' }
        ]
      }
    end
  end

  def edit
    authorize @user
    render inertia: "Admin/Users/Edit", props: {
      user: user_props(@user),
      breadcrumbs: [
        { label: 'Admin', href: '/admin/console' },
        { label: 'Users', href: '/admin/users' },
        { label: @user.name, href: "/admin/users/#{@user.id}" },
        { label: 'Edit' }
      ]
    }
  end

  def update
    authorize @user

    # Only allow updating name and admin status, not password
    update_params = params.require(:user).permit(:name, :admin)

    if @user.update(update_params)
      redirect_to admin_users_path, notice: "User was successfully updated."
    else
      render inertia: "Admin/Users/Edit", props: {
        errors: @user.errors.messages,
        user: user_props(@user),
        breadcrumbs: [
          { label: 'Admin', href: '/admin/console' },
          { label: 'Users', href: '/admin/users' },
          { label: @user.name, href: "/admin/users/#{@user.id}" },
          { label: 'Edit' }
        ]
      }
    end
  end

  def resend_invitation
    @user = User.find(params[:id])
    authorize @user

    outcome = Invitations::ResendInvitation.run(
      current_user: current_user,
      user_id: @user.id
    )

    if outcome.valid?
      redirect_to admin_users_path, notice: "Invitation resent successfully to #{outcome.result.email}"
    else
      redirect_to admin_users_path, alert: outcome.errors.full_messages.join(", ")
    end
  end

  def destroy
    authorize @user

    begin
      @user.destroy!
      redirect_to admin_users_path, notice: "User was successfully deleted."
    rescue => e
      Rails.logger.error "Failed to delete user: #{e.message}"
      Rails.logger.error e.backtrace.join("\n")
      redirect_to admin_users_path, alert: "Failed to delete user: #{e.message}"
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    permitted_attrs = policy(@user || User).permitted_attributes
    params.require(:user).permit(*permitted_attrs)
  end

  def user_props(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      created_at: user.created_at.iso8601,
      invitation_pending: user.invitation_pending?,
      invitation_accepted: user.invitation_accepted?,
      active: user.active?
    }
  end
end
