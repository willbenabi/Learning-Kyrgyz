require 'rails_helper'

RSpec.describe ChatConversation, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:chat_messages).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:user) }
  end

  describe 'scopes' do
    let(:user) { create(:user) }
    let!(:conversation1) { create(:chat_conversation, user: user, last_message_at: 2.days.ago) }
    let!(:conversation2) { create(:chat_conversation, user: user, last_message_at: 1.day.ago) }
    let!(:conversation3) { create(:chat_conversation, user: user, last_message_at: Time.current) }

    describe '.recent' do
      it 'orders conversations by last_message_at descending' do
        expect(ChatConversation.recent).to eq([conversation3, conversation2, conversation1])
      end
    end

    describe '.for_user' do
      let(:other_user) { create(:user) }
      let!(:other_conversation) { create(:chat_conversation, user: other_user) }

      it 'returns only conversations for specified user' do
        expect(ChatConversation.for_user(user)).to match_array([conversation1, conversation2, conversation3])
        expect(ChatConversation.for_user(user)).not_to include(other_conversation)
      end
    end
  end

  describe '#update_last_message_time!' do
    let(:conversation) { create(:chat_conversation, last_message_at: 1.day.ago) }

    it 'updates last_message_at to current time' do
      old_time = conversation.last_message_at
      conversation.update_last_message_time!
      conversation.reload

      expect(conversation.last_message_at).to be > old_time
      expect(conversation.last_message_at).to be_within(1.second).of(Time.current)
    end
  end

  describe '#generate_title_from_first_message' do
    let(:conversation) { create(:chat_conversation) }

    context 'when conversation has user messages' do
      before do
        create(:chat_message, chat_conversation: conversation, role: 'assistant', content: 'Welcome!')
        create(:chat_message, chat_conversation: conversation, role: 'user', content: 'This is a long message that should be truncated because it exceeds fifty characters')
      end

      it 'returns first 50 characters of first user message' do
        expect(conversation.generate_title_from_first_message).to eq('This is a long message that should be truncated...')
      end
    end

    context 'when conversation has no user messages' do
      it 'returns default title' do
        expect(conversation.generate_title_from_first_message).to eq('New Conversation')
      end
    end
  end
end
