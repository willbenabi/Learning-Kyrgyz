class Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :require_super_admin
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /admin/users
  def index
    @pagy, @users = pagy(User.order(created_at: :desc), items: 20)

    render inertia: 'Admin/Users/Index', props: {
      users: @users.map { |u| user_props(u) },
      pagination: pagination_props(@pagy)
    }
  end

  # GET /admin/users/:id
  def show
    render inertia: 'Admin/Users/Show', props: {
      user: user_props(@user)
    }
  end

  # GET /admin/users/new
  def new
    render inertia: 'Admin/Users/New'
  end

  # POST /admin/users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: { message: 'User created successfully', user: user_props(@user) }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /admin/users/:id/edit
  def edit
    render inertia: 'Admin/Users/Edit', props: {
      user: user_props(@user)
    }
  end

  # PATCH /admin/users/:id
  def update
    if @user.update(user_params)
      render json: { message: 'User updated successfully', user: user_props(@user) }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /admin/users/:id
  def destroy
    if @user == current_user
      render json: { error: 'Cannot delete yourself' }, status: :unprocessable_entity
      return
    end

    @user.destroy
    render json: { message: 'User deleted successfully' }
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role, :super_admin)
  end

  def require_super_admin
    unless current_user.super_admin?
      render json: { error: 'Unauthorized' }, status: :forbidden
    end
  end

  def user_props(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      super_admin: user.super_admin?,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  end

  def pagination_props(pagy)
    {
      page: pagy.page,
      pages: pagy.pages,
      count: pagy.count,
      from: pagy.from,
      to: pagy.to,
      prev: pagy.prev,
      next: pagy.next
    }
  end
end
