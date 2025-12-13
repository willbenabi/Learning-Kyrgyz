class DailyRecommendation < ApplicationRecord
  LEVELS = %w[A1 A2 B1 B2 C1].freeze
  CONTENT_TYPES = %w[reading listening watching].freeze
  RESOURCE_TYPES = %w[Song Article Video Podcast Book Film Series Story Game Website].freeze

  validates :level, presence: true, inclusion: { in: LEVELS }
  validates :date, presence: true
  validates :content_type, presence: true, inclusion: { in: CONTENT_TYPES }
  validates :title, presence: true
  validates :description, presence: true
  validates :resource_type, inclusion: { in: RESOURCE_TYPES }, allow_nil: true

  scope :for_date, ->(date) { where(date: date) }
  scope :for_level, ->(level) { where(level: level) }
  scope :today, -> { where(date: Date.current) }

  def self.for_level_and_date(level, date = Date.current)
    for_level(level).for_date(date)
  end
end
