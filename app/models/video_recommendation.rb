# == Schema Information
#
# Table name: video_recommendations
#
#  id             :integer          not null, primary key
#  active         :boolean          default(TRUE), not null
#  category       :string
#  description    :text             not null
#  last_shown_at  :datetime
#  level          :string           not null
#  thumbnail_url  :string           not null
#  title          :string           not null
#  video_url      :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_video_recommendations_on_active         (active)
#  index_video_recommendations_on_last_shown_at  (last_shown_at)
#  index_video_recommendations_on_level          (level)
#
class VideoRecommendation < ApplicationRecord
  # Audit trail for tracking changes
  audited

  LEVELS = %w[A1 A2 B1 B2 C1].freeze
  CATEGORIES = %w[tutorial conversation grammar vocabulary culture music news].freeze

  # Validations
  validates :level, presence: true, inclusion: { in: LEVELS }
  validates :title, presence: true, length: { maximum: 255 }
  validates :description, presence: true
  validates :video_url, presence: true, format: { with: URI::regexp(%w[http https]) }
  validates :thumbnail_url, presence: true, format: { with: URI::regexp(%w[http https]) }
  validates :category, inclusion: { in: CATEGORIES }, allow_nil: true

  # Scopes
  scope :active, -> { where(active: true) }
  scope :for_level, ->(level) { where(level: level) }
  scope :not_shown_recently, ->(hours = 24) { where('last_shown_at IS NULL OR last_shown_at < ?', hours.hours.ago) }
  scope :by_last_shown, -> { order(Arel.sql('last_shown_at IS NULL DESC, last_shown_at ASC')) }

  # Ransack configuration
  def self.ransackable_attributes(auth_object = nil)
    %w[id title description level category active created_at updated_at]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end

  # Get random recommendations for a specific level
  # Returns 4-5 videos that haven't been shown recently
  def self.daily_recommendations(level:, count: 5)
    active
      .for_level(level)
      .not_shown_recently
      .order('RANDOM()')
      .limit(count)
      .tap do |recommendations|
        # Update last_shown_at for selected videos
        recommendation_ids = recommendations.map(&:id)
        where(id: recommendation_ids).update_all(last_shown_at: Time.current) if recommendation_ids.any?
      end
  end

  # Mark this video as shown
  def mark_as_shown!
    update!(last_shown_at: Time.current)
  end
end
