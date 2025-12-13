# frozen_string_literal: true

# Policy for Audited::Audit records
module Audited
  class AuditPolicy < ApplicationPolicy
    class Scope < ApplicationPolicy::Scope
      def resolve
        if user.admin?
          scope.all
        else
          scope.none
        end
      end
    end

    def index?
      user.admin?
    end
  end
end
