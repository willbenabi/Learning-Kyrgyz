# frozen_string_literal: true

class ConsolePolicy < ApplicationPolicy
  def index?
    user.admin?
  end
end
