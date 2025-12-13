require 'rails_helper'

RSpec.describe DailyRecommendation, type: :model do
  describe 'validations' do
    it 'validates presence of level' do
      recommendation = DailyRecommendation.new(level: nil)
      expect(recommendation).not_to be_valid
      expect(recommendation.errors[:level]).to include("can't be blank")
    end

    it 'validates level inclusion' do
      recommendation = DailyRecommendation.new(level: 'D1')
      expect(recommendation).not_to be_valid
      expect(recommendation.errors[:level]).to include("is not included in the list")
    end

    it 'validates presence of date' do
      recommendation = DailyRecommendation.new(date: nil)
      expect(recommendation).not_to be_valid
      expect(recommendation.errors[:date]).to include("can't be blank")
    end

    it 'validates presence of content_type' do
      recommendation = DailyRecommendation.new(content_type: nil)
      expect(recommendation).not_to be_valid
      expect(recommendation.errors[:content_type]).to include("can't be blank")
    end

    it 'validates content_type inclusion' do
      recommendation = DailyRecommendation.new(content_type: 'invalid')
      expect(recommendation).not_to be_valid
      expect(recommendation.errors[:content_type]).to include("is not included in the list")
    end

    it 'validates presence of title' do
      recommendation = DailyRecommendation.new(title: nil)
      expect(recommendation).not_to be_valid
      expect(recommendation.errors[:title]).to include("can't be blank")
    end

    it 'validates presence of description' do
      recommendation = DailyRecommendation.new(description: nil)
      expect(recommendation).not_to be_valid
      expect(recommendation.errors[:description]).to include("can't be blank")
    end

    it 'validates resource_type inclusion when present' do
      recommendation = DailyRecommendation.new(
        level: 'A1',
        date: Date.current,
        content_type: 'watching',
        title: 'Test',
        description: 'Test description',
        resource_type: 'InvalidType'
      )
      expect(recommendation).not_to be_valid
      expect(recommendation.errors[:resource_type]).to include("is not included in the list")
    end

    it 'allows nil resource_type' do
      recommendation = DailyRecommendation.new(
        level: 'A1',
        date: Date.current,
        content_type: 'watching',
        title: 'Test',
        description: 'Test description',
        resource_type: nil
      )
      expect(recommendation).to be_valid
    end

    it 'allows valid resource_type' do
      recommendation = DailyRecommendation.new(
        level: 'A1',
        date: Date.current,
        content_type: 'watching',
        title: 'Test Video',
        description: 'Test description',
        resource_type: 'Video',
        url: 'https://example.com'
      )
      expect(recommendation).to be_valid
    end
  end

  describe 'scopes' do
    let!(:today_a1) do
      create(:daily_recommendation, level: 'A1', date: Date.current)
    end
    let!(:today_b1) do
      create(:daily_recommendation, level: 'B1', date: Date.current)
    end
    let!(:yesterday_a1) do
      create(:daily_recommendation, level: 'A1', date: Date.yesterday)
    end

    describe '.for_date' do
      it 'returns recommendations for specified date' do
        expect(DailyRecommendation.for_date(Date.current)).to contain_exactly(today_a1, today_b1)
      end
    end

    describe '.for_level' do
      it 'returns recommendations for specified level' do
        expect(DailyRecommendation.for_level('A1')).to contain_exactly(today_a1, yesterday_a1)
      end
    end

    describe '.today' do
      it 'returns recommendations for today' do
        expect(DailyRecommendation.today).to contain_exactly(today_a1, today_b1)
      end
    end

    describe '.for_level_and_date' do
      it 'returns recommendations for level and date' do
        expect(DailyRecommendation.for_level_and_date('A1', Date.current)).to contain_exactly(today_a1)
      end
    end
  end
end
