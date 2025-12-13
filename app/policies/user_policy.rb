class UserPolicy < ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(id: user.id)
      end
    end
  end

  def index?
    user.admin?
  end

  def show?
    user.admin? || record.id == user.id
  end

  def create?
    user.admin?
  end

  def new?
    create?
  end

  def update?
    user.admin? || record.id == user.id
  end

  def edit?
    update?
  end

  def destroy?
    user.admin? && record.id != user.id
  end

  def resend_invitation?
    user.admin?
  end

  def permitted_attributes_for_create
    [ :name, :email, :password, :password_confirmation ]
  end

  def permitted_attributes_for_update
    [ :name, :email, :password, :password_confirmation ]
  end

  def permitted_attributes
    permitted_attributes_for_update
  end
end
