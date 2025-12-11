require 'rails_helper'

RSpec.describe Ai::GeminiService do
  describe '.chat_completion' do
    let(:messages) do
      [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello!' }
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
      allow(ENV).to receive(:[]).with('GOOGLE_GEMINI_API_KEY').and_return('test_api_key')
      allow(ENV).to receive(:[]).with('GEMINI_API_KEY').and_return(nil)
    end

    context 'when API request is successful' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent})
          .with(
            query: hash_including({ 'key' => 'test_api_key' }),
            headers: { 'Content-Type' => 'application/json' }
          )
          .to_return(
            status: 200,
            body: gemini_response.to_json,
            headers: { 'Content-Type' => 'application/json' }
          )
      end

      it 'returns chat completion response' do
        result = described_class.chat_completion(messages: messages)

        expect(result).to be_a(Hash)
        expect(result['choices']).to be_an(Array)
        expect(result['choices'].first['message']['content']).to eq('Саламатсызбы! Мен сизге кандай жардам бере алам?')
      end

      it 'converts messages to Gemini format' do
        described_class.chat_completion(messages: messages)

        expect(WebMock).to have_requested(:post, %r{generateContent})
          .with { |req|
            body = JSON.parse(req.body)
            contents = body['contents']

            # System message should be prepended to first user message
            expect(contents.length).to eq(1)
            expect(contents.first['role']).to eq('user')
            expect(contents.first['parts'].first['text']).to include('You are a helpful assistant.')
            expect(contents.first['parts'].first['text']).to include('Hello!')
          }
      end

      it 'includes generation config' do
        described_class.chat_completion(messages: messages, temperature: 0.8)

        expect(WebMock).to have_requested(:post, %r{generateContent})
          .with { |req|
            body = JSON.parse(req.body)
            expect(body['generationConfig']['temperature']).to eq(0.8)
            expect(body['generationConfig']['maxOutputTokens']).to eq(1000)
          }
      end

      it 'returns usage statistics' do
        result = described_class.chat_completion(messages: messages)

        expect(result['usage']).to include(
          'prompt_tokens' => 10,
          'completion_tokens' => 15,
          'total_tokens' => 25
        )
      end
    end

    context 'when converting messages to Gemini format' do
      it 'converts user messages correctly' do
        messages = [{ role: 'user', content: 'Hello' }]
        result = described_class.send(:convert_messages_to_gemini_format, messages)

        expect(result).to eq([
          { role: 'user', parts: [{ text: 'Hello' }] }
        ])
      end

      it 'converts assistant messages to model role' do
        messages = [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi there!' }
        ]
        result = described_class.send(:convert_messages_to_gemini_format, messages)

        expect(result[1]).to eq({ role: 'model', parts: [{ text: 'Hi there!' }] })
      end

      it 'prepends system message to first user message' do
        messages = [
          { role: 'system', content: 'You are helpful.' },
          { role: 'user', content: 'Hello' }
        ]
        result = described_class.send(:convert_messages_to_gemini_format, messages)

        expect(result.length).to eq(1)
        expect(result.first[:parts].first[:text]).to include('You are helpful.')
        expect(result.first[:parts].first[:text]).to include('Hello')
      end

      it 'handles multiple system messages' do
        messages = [
          { role: 'system', content: 'Rule 1' },
          { role: 'system', content: 'Rule 2' },
          { role: 'user', content: 'Question' }
        ]
        result = described_class.send(:convert_messages_to_gemini_format, messages)

        expect(result.length).to eq(1)
        text = result.first[:parts].first[:text]
        expect(text).to include('Rule 1')
        expect(text).to include('Rule 2')
        expect(text).to include('Question')
      end

      it 'handles conversation with multiple turns' do
        messages = [
          { role: 'system', content: 'System' },
          { role: 'user', content: 'Question 1' },
          { role: 'assistant', content: 'Answer 1' },
          { role: 'user', content: 'Question 2' }
        ]
        result = described_class.send(:convert_messages_to_gemini_format, messages)

        expect(result.length).to eq(3)
        expect(result[0][:role]).to eq('user')
        expect(result[1][:role]).to eq('model')
        expect(result[2][:role]).to eq('user')
      end
    end

    context 'when API request fails' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent})
          .to_return(status: 500, body: { error: 'Internal Server Error' }.to_json)
      end

      it 'returns error hash' do
        result = described_class.chat_completion(messages: messages)

        expect(result).to have_key(:error)
        expect(result[:error]).to eq('Failed to get response from AI')
        expect(result[:status]).to eq(500)
      end

      it 'logs the error' do
        expect(Rails.logger).to receive(:error).with(/Gemini API Error/)
        described_class.chat_completion(messages: messages)
      end
    end

    context 'when network error occurs' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent})
          .to_raise(Faraday::ConnectionFailed.new('Connection refused'))
      end

      it 'returns error hash' do
        result = described_class.chat_completion(messages: messages)

        expect(result).to have_key(:error)
        expect(result[:error]).to include('Connection refused')
      end

      it 'logs the error' do
        expect(Rails.logger).to receive(:error).with(/Gemini Service Error/)
        described_class.chat_completion(messages: messages)
      end
    end

    context 'when response parsing fails' do
      before do
        stub_request(:post, %r{https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent})
          .to_return(
            status: 200,
            body: { invalid: 'response' }.to_json,
            headers: { 'Content-Type' => 'application/json' }
          )
      end

      it 'returns error hash' do
        result = described_class.chat_completion(messages: messages)

        expect(result).to have_key(:error)
        expect(result[:error]).to eq('Failed to parse AI response')
      end

      it 'logs the parse error' do
        expect(Rails.logger).to receive(:error).with(/Gemini Response Parse Error/)
        described_class.chat_completion(messages: messages)
      end
    end

    describe '.api_key' do
      it 'reads from GOOGLE_GEMINI_API_KEY first' do
        allow(ENV).to receive(:[]).and_call_original
        allow(ENV).to receive(:[]).with('GOOGLE_GEMINI_API_KEY').and_return('google_key')
        allow(ENV).to receive(:[]).with('GEMINI_API_KEY').and_return('old_key')
        expect(described_class.send(:api_key)).to eq('google_key')
      end

      it 'falls back to GEMINI_API_KEY if GOOGLE_GEMINI_API_KEY not set' do
        allow(ENV).to receive(:[]).and_call_original
        allow(ENV).to receive(:[]).with('GOOGLE_GEMINI_API_KEY').and_return(nil)
        allow(ENV).to receive(:[]).with('GEMINI_API_KEY').and_return('env_key')
        expect(described_class.send(:api_key)).to eq('env_key')
      end

      it 'falls back to Rails credentials if neither ENV variable set' do
        allow(ENV).to receive(:[]).and_call_original
        allow(ENV).to receive(:[]).with('GOOGLE_GEMINI_API_KEY').and_return(nil)
        allow(ENV).to receive(:[]).with('GEMINI_API_KEY').and_return(nil)
        allow(Rails.application.credentials).to receive(:dig).with(:gemini, :api_key).and_return('creds_key')
        expect(described_class.send(:api_key)).to eq('creds_key')
      end
    end
  end
end
