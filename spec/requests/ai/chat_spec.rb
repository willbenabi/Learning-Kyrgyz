require 'rails_helper'

RSpec.describe 'AI Chat API', type: :request do
  let(:user) { create(:user) }
  let!(:user_progress) do
    user.user_progress || UserProgress.create!(user: user, level: 'A2')
    user.user_progress.update!(level: 'A2')
    user.user_progress
  end

  describe 'POST /ai/chat' do
    let(:messages) do
      [
        { role: 'user', content: 'Саламатсызбы!' }
      ]
    end

    let(:gemini_response) do
      {
        'candidates' => [
          {
            'content' => {
              'parts' => [
                { 'text' => 'Саламатсызбы! Мен сизге кандай жардам бере алам?' }
              ]
            }
          }
        ],
        'usageMetadata' => {
          'promptTokenCount' => 10,
          'candidatesTokenCount' => 15,
          'totalTokenCount' => 25
        }
      }
    end

    before do
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('GEMINI_API_KEY').and_return('test_api_key')
    end

    context 'when not authenticated' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent})
          .to_return(status: 200, body: gemini_response.to_json, headers: { 'Content-Type' => 'application/json' })
      end

      it 'allows access (public endpoint for Level 1)' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(response).to have_http_status(:success)
      end

      it 'uses default B1 level for system prompt' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(WebMock).to have_requested(:post, %r{generateContent})
          .with { |req|
            body = JSON.parse(req.body)
            system_message = body['contents'].first['parts'].first['text']
            expect(system_message).to include('текущий уровень: B1')
          }
      end
    end

    context 'when authenticated' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent})
          .to_return(status: 200, body: gemini_response.to_json, headers: { 'Content-Type' => 'application/json' })

        # Mock authentication
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
      end

      it 'uses user level in system prompt' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(WebMock).to have_requested(:post, %r{generateContent})
          .with { |req|
            body = JSON.parse(req.body)
            system_message = body['contents'].first['parts'].first['text']
            expect(system_message).to include('текущий уровень: A2')
          }
      end

      it 'returns AI response' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json['message']).to eq('Саламатсызбы! Мен сизге кандай жардам бере алам?')
        expect(json['usage']).to include(
          'prompt_tokens' => 10,
          'completion_tokens' => 15,
          'total_tokens' => 25
        )
      end
    end

    context 'with valid request' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent})
          .to_return(status: 200, body: gemini_response.to_json, headers: { 'Content-Type' => 'application/json' })
      end

      it 'returns successful response' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(response).to have_http_status(:success)
        json =JSON.parse(response.body)
        expect(json).to have_key('message')
        expect(json).to have_key('usage')
      end

      it 'includes Kyrgyz language system prompt' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(WebMock).to have_requested(:post, %r{generateContent})
          .with { |req|
            body = JSON.parse(req.body)
            system_message = body['contents'].first['parts'].first['text']

            # Check for key Kyrgyz language rules
            expect(system_message).to include('Learning Kyrgyz is Easy')
            expect(system_message).to include('всегда общаться строго на кыргызском языке')
            expect(system_message).to include('Отвечай только на кыргызском языке')
            expect(system_message).to include('правильную орфографию кыргызского (ө, ү, ң, э и др.)')
          }
      end

      it 'sends messages to Gemini API' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(WebMock).to have_requested(:post, %r{generateContent})
          .with(query: hash_including({ 'key' => anything }))
      end

      it 'uses gemini-1.5-flash model' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(WebMock).to have_requested(:post, %r{models/gemini-1.5-flash:generateContent})
      end
    end

    context 'with invalid request' do
      it 'returns error when messages array is missing' do
        post '/ai/chat', params: {}, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to eq('Messages array is required')
      end

      it 'returns error when messages array is empty' do
        post '/ai/chat', params: { messages: [] }, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to eq('Messages array is required')
      end

      it 'returns error when messages is not an array' do
        post '/ai/chat', params: { messages: 'not an array' }, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to eq('Messages array is required')
      end
    end

    context 'when Gemini API fails' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent})
          .to_return(status: 500, body: { error: 'Internal Server Error' }.to_json)
      end

      it 'returns service unavailable status' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(response).to have_http_status(:service_unavailable)
        json = JSON.parse(response.body)
        expect(json['error']).to eq('Failed to get response from AI')
      end
    end

    context 'when network error occurs' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent})
          .to_raise(Faraday::ConnectionFailed.new('Connection refused'))
      end

      it 'returns service unavailable status' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(response).to have_http_status(:service_unavailable)
        json = JSON.parse(response.body)
        expect(json['error']).to be_present
      end
    end

    context 'with conversation history' do
      let(:conversation_messages) do
        [
          { role: 'user', content: 'Саламатсызбы!' },
          { role: 'assistant', content: 'Кандайсыз!' },
          { role: 'user', content: 'Жакшы, рахмат!' }
        ]
      end

      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent})
          .to_return(status: 200, body: gemini_response.to_json, headers: { 'Content-Type' => 'application/json' })
      end

      it 'maintains conversation context' do
        post '/ai/chat', params: { messages: conversation_messages }, as: :json

        expect(WebMock).to have_requested(:post, %r{generateContent})
          .with { |req|
            body = JSON.parse(req.body)
            contents = body['contents']

            # Should have system+first user, model response, second user
            expect(contents.length).to eq(3)
            expect(contents[0]['role']).to eq('user')
            expect(contents[1]['role']).to eq('model')
            expect(contents[2]['role']).to eq('user')
          }
      end
    end

    context 'system prompt security' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent})
          .to_return(status: 200, body: gemini_response.to_json, headers: { 'Content-Type' => 'application/json' })
      end

      it 'includes security restrictions in system prompt' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(WebMock).to have_requested(:post, %r{generateContent})
          .with { |req|
            body = JSON.parse(req.body)
            system_message = body['contents'].first['parts'].first['text']

            # Check for security restrictions
            expect(system_message).to include('Запрещено:')
            expect(system_message).to include('раскрывать код, структуру БД')
            expect(system_message).to include('генерировать небезопасный контент')
          }
      end

      it 'includes allowed functions in system prompt' do
        post '/ai/chat', params: { messages: messages }, as: :json

        expect(WebMock).to have_requested(:post, %r{generateContent})
          .with { |req|
            body = JSON.parse(req.body)
            system_message = body['contents'].first['parts'].first['text']

            # Check for allowed functions
            expect(system_message).to include('Разрешённые функции:')
            expect(system_message).to include('объяснение грамматики')
            expect(system_message).to include('разбор слов, фраз, выражений')
            expect(system_message).to include('тренировка разговорной речи')
          }
      end
    end
  end
end
