# frozen_string_literal: true

# Audited configuration
Audited.config do |config|
  # Set the current user method
  config.current_user_method = :current_user

  # Set the max audits to keep (optional)
  # config.max_audits = 10

  # Specify the columns to audit (optional - audits all by default)
  # config.audit_class = Audited::Audit
end
