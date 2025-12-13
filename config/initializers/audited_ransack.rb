# Allow Ransack to search Audited::Audit model attributes
# This is required because Ransack needs explicit allowlisting for security
#
# We use Ransack ONLY for:
# - Date range filtering (created_at_gteq, created_at_lteq)
# - Sorting (s: "created_at desc")
#
# Simple filters (action, status) use plain ActiveRecord .where() queries

module Audited
  class Audit < ActiveRecord::Base
    def self.ransackable_attributes(auth_object = nil)
      # Only allow attributes we actually use with Ransack
      [ "created_at", "id" ]
    end

    def self.ransackable_associations(auth_object = nil)
      # No associations needed for our use case
      []
    end
  end
end
