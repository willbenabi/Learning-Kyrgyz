require 'rails_helper'

RSpec.describe ChatMessage, type: :model do
  describe 'associations' do
    it { should belong_to(:chat_conversation) }
  end

  describe 'validations' do
    it { should validate_presence_of(:role) }
    it { should validate_presence_of(:content) }

    it do
      should validate_inclusion_of(:role).
        in_array(%w[user assistant system])
    end
  end

  describe 'scopes' do
    let(:conversation) { create(:chat_conversation) }
    let!(:message1) { create(:chat_message, chat_conversation: conversation, created_at: 3.hours.ago) }
    let!(:message2) { create(:chat_message, chat_conversation: conversation, created_at: 2.hours.ago) }
    let!(:message3) { create(:chat_message, chat_conversation: conversation, created_at: 1.hour.ago) }

    describe '.chronological' do
      it 'orders messages by created_at ascending' do
        expect(conversation.chat_messages.chronological).to eq([message1, message2, message3])
      end
    end
  end

  describe 'callbacks' do
    describe 'after_create' do
      let(:conversation) { create(:chat_conversation, last_message_at: 1.day.ago) }

      it 'updates conversation last_message_at timestamp' do
        old_time = conversation.last_message_at

        expect {
          create(:chat_message, chat_conversation: conversation)
        }.to change { conversation.reload.last_message_at }

        expect(conversation.last_message_at).to be > old_time
        expect(conversation.last_message_at).to be_within(1.second).of(Time.current)
      end
    end
  end
end
