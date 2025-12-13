require 'rails_helper'

RSpec.describe 'Ai::ChatConversations', type: :request do
  let(:user) { create(:user) }
  let(:headers) { auth_headers(user) }

  describe 'GET /ai/chat_conversations' do
    context 'when authenticated' do
      let!(:conversation1) { create(:chat_conversation, user: user, last_message_at: 2.days.ago) }
      let!(:conversation2) { create(:chat_conversation, user: user, last_message_at: 1.day.ago) }
      let!(:other_user_conversation) { create(:chat_conversation) }

      before do
        create(:chat_message, chat_conversation: conversation1, role: 'user', content: 'Hello from conversation 1')
        create(:chat_message, chat_conversation: conversation2, role: 'user', content: 'Hello from conversation 2')
      end

      it 'returns list of user conversations' do
        get '/ai/chat_conversations', headers: headers

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['conversations'].length).to eq(2)
      end

      it 'returns conversations in recent order' do
        get '/ai/chat_conversations', headers: headers

        json = JSON.parse(response.body)
        expect(json['conversations'].first['id']).to eq(conversation2.id)
        expect(json['conversations'].last['id']).to eq(conversation1.id)
      end

      it 'generates title from first message if title is nil' do
        get '/ai/chat_conversations', headers: headers

        json = JSON.parse(response.body)
        conv1 = json['conversations'].find { |c| c['id'] == conversation1.id }
        expect(conv1['title']).to eq('Hello from conversation 1')
      end

      it 'does not return other users conversations' do
        get '/ai/chat_conversations', headers: headers

        json = JSON.parse(response.body)
        conversation_ids = json['conversations'].map { |c| c['id'] }
        expect(conversation_ids).not_to include(other_user_conversation.id)
      end
    end

    context 'when not authenticated' do
      it 'redirects to login' do
        get '/ai/chat_conversations'
        expect(response).to have_http_status(:found)
      end
    end
  end

  describe 'GET /ai/chat_conversations/:id' do
    let(:conversation) { create(:chat_conversation, user: user, title: 'Test Conversation') }
    let!(:message1) { create(:chat_message, chat_conversation: conversation, role: 'user', content: 'Hello', created_at: 1.hour.ago) }
    let!(:message2) { create(:chat_message, :assistant, chat_conversation: conversation, content: 'Hi there!', created_at: 30.minutes.ago) }

    context 'when authenticated' do
      it 'returns conversation with messages' do
        get "/ai/chat_conversations/#{conversation.id}", headers: headers

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['conversation']['id']).to eq(conversation.id)
        expect(json['conversation']['title']).to eq('Test Conversation')
        expect(json['messages'].length).to eq(2)
      end

      it 'returns messages in chronological order' do
        get "/ai/chat_conversations/#{conversation.id}", headers: headers

        json = JSON.parse(response.body)
        expect(json['messages'].first['content']).to eq('Hello')
        expect(json['messages'].last['content']).to eq('Hi there!')
      end

      it 'returns 404 when conversation not found' do
        get "/ai/chat_conversations/99999", headers: headers

        expect(response).to have_http_status(:not_found)
      end

      it 'returns 404 when accessing other users conversation' do
        other_conversation = create(:chat_conversation)
        get "/ai/chat_conversations/#{other_conversation.id}", headers: headers

        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when not authenticated' do
      it 'redirects to login' do
        get "/ai/chat_conversations/#{conversation.id}"
        expect(response).to have_http_status(:found)
      end
    end
  end

  describe 'POST /ai/chat_conversations' do
    context 'when authenticated' do
      it 'creates new conversation' do
        expect {
          post '/ai/chat_conversations', headers: headers
        }.to change { ChatConversation.count }.by(1)

        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json['conversation']['id']).to be_present
        expect(json['conversation']['last_message_at']).to be_present
      end

      it 'associates conversation with current user' do
        post '/ai/chat_conversations', headers: headers

        json = JSON.parse(response.body)
        conversation = ChatConversation.find(json['conversation']['id'])
        expect(conversation.user_id).to eq(user.id)
      end
    end

    context 'when not authenticated' do
      it 'redirects to login' do
        post '/ai/chat_conversations'
        expect(response).to have_http_status(:found)
      end
    end
  end

  describe 'POST /ai/chat_conversations/:id/add_message' do
    let(:conversation) { create(:chat_conversation, user: user) }

    context 'when authenticated' do
      it 'adds message to conversation' do
        expect {
          post "/ai/chat_conversations/#{conversation.id}/add_message",
               params: { role: 'user', content: 'New message' },
               headers: headers
        }.to change { conversation.chat_messages.count }.by(1)

        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json['message']['role']).to eq('user')
        expect(json['message']['content']).to eq('New message')
      end

      it 'updates conversation title from first user message' do
        post "/ai/chat_conversations/#{conversation.id}/add_message",
             params: { role: 'user', content: 'This should become the title' },
             headers: headers

        conversation.reload
        expect(conversation.title).to eq('This should become the title')
      end

      it 'does not update title if already set' do
        conversation.update!(title: 'Existing Title')

        post "/ai/chat_conversations/#{conversation.id}/add_message",
             params: { role: 'user', content: 'New message' },
             headers: headers

        conversation.reload
        expect(conversation.title).to eq('Existing Title')
      end

      it 'does not update title from assistant messages' do
        post "/ai/chat_conversations/#{conversation.id}/add_message",
             params: { role: 'assistant', content: 'Assistant message' },
             headers: headers

        conversation.reload
        expect(conversation.title).to be_nil
      end

      it 'returns 422 when role is missing' do
        post "/ai/chat_conversations/#{conversation.id}/add_message",
             params: { content: 'Message without role' },
             headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns 422 when content is missing' do
        post "/ai/chat_conversations/#{conversation.id}/add_message",
             params: { role: 'user' },
             headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns 404 when conversation not found' do
        post "/ai/chat_conversations/99999/add_message",
             params: { role: 'user', content: 'Message' },
             headers: headers

        expect(response).to have_http_status(:not_found)
      end

      it 'returns 404 when accessing other users conversation' do
        other_conversation = create(:chat_conversation)

        post "/ai/chat_conversations/#{other_conversation.id}/add_message",
             params: { role: 'user', content: 'Message' },
             headers: headers

        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when not authenticated' do
      it 'redirects to login' do
        post "/ai/chat_conversations/#{conversation.id}/add_message",
             params: { role: 'user', content: 'Message' }

        expect(response).to have_http_status(:found)
      end
    end
  end

  describe 'DELETE /ai/chat_conversations/:id' do
    let(:conversation) { create(:chat_conversation, user: user) }
    let!(:message) { create(:chat_message, chat_conversation: conversation) }

    context 'when authenticated' do
      it 'deletes conversation' do
        expect {
          delete "/ai/chat_conversations/#{conversation.id}", headers: headers
        }.to change { ChatConversation.count }.by(-1)

        expect(response).to have_http_status(:no_content)
      end

      it 'deletes associated messages' do
        expect {
          delete "/ai/chat_conversations/#{conversation.id}", headers: headers
        }.to change { ChatMessage.count }.by(-1)
      end

      it 'returns 404 when conversation not found' do
        delete "/ai/chat_conversations/99999", headers: headers

        expect(response).to have_http_status(:not_found)
      end

      it 'returns 404 when accessing other users conversation' do
        other_conversation = create(:chat_conversation)

        delete "/ai/chat_conversations/#{other_conversation.id}", headers: headers

        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when not authenticated' do
      it 'redirects to login' do
        delete "/ai/chat_conversations/#{conversation.id}"
        expect(response).to have_http_status(:found)
      end
    end
  end
end
