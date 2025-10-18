class UserPreference < ApplicationRecord
  belongs_to :user

  validates :user, presence: true
  validate :validate_sidebar_variant
  validate :validate_theme

  # Set default preferences after initialization
  after_initialize :set_default_preferences

  VALID_SIDEBAR_VARIANTS = %w[sidebar floating inset].freeze
  VALID_THEMES = %w[light dark system].freeze

  def sidebar_variant
    preferences['sidebar_variant'] || 'inset'
  end

  def sidebar_variant=(value)
    self.preferences = preferences.merge('sidebar_variant' => value)
  end

  def theme
    preferences['theme'] || 'system'
  end

  def theme=(value)
    self.preferences = preferences.merge('theme' => value)
  end

  private

  def set_default_preferences
    self.preferences ||= {}
    self.preferences['sidebar_variant'] ||= 'inset'
    self.preferences['theme'] ||= 'system'
  end

  def validate_sidebar_variant
    variant = preferences['sidebar_variant']
    if variant.present? && !VALID_SIDEBAR_VARIANTS.include?(variant)
      errors.add(:sidebar_variant, 'must be sidebar, floating, or inset')
    end
  end

  def validate_theme
    theme_value = preferences['theme']
    if theme_value.present? && !VALID_THEMES.include?(theme_value)
      errors.add(:theme, 'must be light, dark, or system')
    end
  end
end
