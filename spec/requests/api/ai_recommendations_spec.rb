require 'rails_helper'

RSpec.describe 'API::AiRecommendations', type: :request do
  describe 'GET /api/ai-recommendations' do
    let!(:today_a1_recs) do
      create_list(:daily_recommendation, 3, level: 'A1', date: Date.current, resource_type: 'Video')
    end
    let!(:today_b1_recs) do
      create_list(:daily_recommendation, 3, level: 'B1', date: Date.current, resource_type: 'Song')
    end
    let!(:yesterday_a1_recs) do
      create_list(:daily_recommendation, 3, level: 'A1', date: Date.yesterday, resource_type: 'Article')
    end

    context 'with valid level parameter' do
      it 'returns recommendations for specified level and today\'s date' do
        get '/api/ai-recommendations', params: { level: 'A1' }

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)

        expect(json['level']).to eq('A1')
        expect(json['date']).to eq(Date.current.to_s)
        expect(json['count']).to eq(3)
        expect(json['recommendations'].count).to eq(3)
      end

      it 'returns recommendations with all required fields' do
        get '/api/ai-recommendations', params: { level: 'A1' }

        json = JSON.parse(response.body)
        recommendation = json['recommendations'].first

        expect(recommendation).to include(
          'id',
          'type',
          'resource_type',
          'title',
          'description',
          'url',
          'thumbnail_url',
          'generated_at'
        )
      end

      it 'returns resource_type field' do
        get '/api/ai-recommendations', params: { level: 'A1' }

        json = JSON.parse(response.body)
        recommendation = json['recommendations'].first

        expect(recommendation['resource_type']).to eq('Video')
      end

      it 'returns thumbnail_url field' do
        get '/api/ai-recommendations', params: { level: 'A1' }

        json = JSON.parse(response.body)
        recommendation = json['recommendations'].first

        expect(recommendation['thumbnail_url']).to be_present
        expect(recommendation['thumbnail_url']).to include('ytimg.com')
      end
    end

    context 'with specific date parameter' do
      it 'returns recommendations for specified date' do
        get '/api/ai-recommendations', params: { level: 'A1', date: Date.yesterday.to_s }

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)

        expect(json['date']).to eq(Date.yesterday.to_s)
        expect(json['count']).to eq(3)
        expect(json['recommendations'].first['resource_type']).to eq('Article')
      end
    end

    context 'with invalid level parameter' do
      it 'returns unprocessable_entity status' do
        get '/api/ai-recommendations', params: { level: 'Z9' }

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to include('Invalid level')
      end
    end

    context 'with invalid date parameter' do
      it 'returns unprocessable_entity status' do
        get '/api/ai-recommendations', params: { level: 'A1', date: 'invalid-date' }

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to eq('Invalid date format')
      end
    end

    context 'when no recommendations exist' do
      before do
        DailyRecommendation.destroy_all
      end

      it 'returns empty recommendations array' do
        get '/api/ai-recommendations', params: { level: 'C1' }

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)

        expect(json['count']).to eq(0)
        expect(json['recommendations']).to eq([])
      end
    end

    context 'verifying exactly 3 recommendations per day' do
      before do
        DailyRecommendation.destroy_all
        # Create exactly 3 recommendations for each level
        create_list(:daily_recommendation, 3, level: 'A1', date: Date.current)
        create_list(:daily_recommendation, 3, level: 'A2', date: Date.current)
        create_list(:daily_recommendation, 3, level: 'B1', date: Date.current)
        create_list(:daily_recommendation, 3, level: 'B2', date: Date.current)
        create_list(:daily_recommendation, 3, level: 'C1', date: Date.current)
      end

      %w[A1 A2 B1 B2 C1].each do |level|
        it "returns exactly 3 recommendations for #{level}" do
          get '/api/ai-recommendations', params: { level: level }

          json = JSON.parse(response.body)
          expect(json['count']).to eq(3)
          expect(json['recommendations'].count).to eq(3)
        end
      end
    end
  end
end
