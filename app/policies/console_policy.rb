# frozen_string_literal: true

class ConsolePolicy < ApplicationPolicy
  def index?
    user.super_admin?
  end
end
