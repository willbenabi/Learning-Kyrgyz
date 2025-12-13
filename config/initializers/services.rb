# Auto-load services directory
Rails.application.config.to_prepare do
  Dir.glob(Rails.root.join("app", "services", "**", "*.rb")).each do |file|
    require_dependency file
  end
end
