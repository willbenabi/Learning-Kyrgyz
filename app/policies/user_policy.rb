class UserPolicy < ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.owner?
        scope.all
      else
        scope.where(id: user.id)
      end
    end
  end

  def index?
    user.owner?
  end

  def show?
    user.owner? || record.id == user.id
  end

  def create?
    user.owner?
  end

  def new?
    create?
  end

  def update?
    user.owner? || record.id == user.id
  end

  def edit?
    update?
  end

  def destroy?
    user.owner? && record.id != user.id
  end

  def resend_invitation?
    user.owner?
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
