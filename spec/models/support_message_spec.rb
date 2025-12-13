require 'rails_helper'

RSpec.describe SupportMessage, type: :model do
  include ActiveSupport::Testing::TimeHelpers

  let(:user) { create(:user) }

  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:subject) }
    it { should validate_presence_of(:message) }
    it { should validate_presence_of(:status) }
    it { should validate_length_of(:subject).is_at_most(255) }
    it { should validate_inclusion_of(:status).in_array(%w[unread read]) }
  end

  describe 'scopes' do
    let!(:unread_message) { create(:support_message, user: user, status: 'unread') }
    let!(:read_message) { create(:support_message, user: user, status: 'read', read_at: Time.current) }

    it 'returns unread messages' do
      expect(SupportMessage.unread).to include(unread_message)
      expect(SupportMessage.unread).not_to include(read_message)
    end

    it 'returns read messages' do
      expect(SupportMessage.read).to include(read_message)
      expect(SupportMessage.read).not_to include(unread_message)
    end

    it 'returns recent messages first' do
      old_message = nil
      new_message = nil

      travel_to 2.days.ago do
        old_message = create(:support_message, user: user)
      end

      travel_to 1.hour.ago do
        new_message = create(:support_message, user: user)
      end

      messages = SupportMessage.where(id: [old_message.id, new_message.id]).recent
      expect(messages.first.id).to eq(new_message.id)
      expect(messages.last.id).to eq(old_message.id)
    end
  end

  describe '#mark_as_read!' do
    let(:message) { create(:support_message, user: user, status: 'unread') }

    it 'updates status to read' do
      expect { message.mark_as_read! }
        .to change { message.reload.status }.from('unread').to('read')
    end

    it 'sets read_at timestamp' do
      travel_to Time.current do
        current_time = Time.current
        expect { message.mark_as_read! }
          .to change { message.reload.read_at }.from(nil)

        expect(message.read_at).to be_within(1.second).of(current_time)
      end
    end
  end

  describe '#unread?' do
    it 'returns true for unread messages' do
      message = build(:support_message, status: 'unread')
      expect(message.unread?).to be true
    end

    it 'returns false for read messages' do
      message = build(:support_message, status: 'read')
      expect(message.unread?).to be false
    end
  end

  describe '#read?' do
    it 'returns true for read messages' do
      message = build(:support_message, status: 'read')
      expect(message.read?).to be true
    end

    it 'returns false for unread messages' do
      message = build(:support_message, status: 'unread')
      expect(message.read?).to be false
    end
  end

  describe 'ransackable attributes' do
    it 'allows searching by permitted attributes' do
      expect(SupportMessage.ransackable_attributes).to include('id', 'subject', 'message', 'status', 'user_id')
    end
  end

  describe 'ransackable associations' do
    it 'allows searching by user association' do
      expect(SupportMessage.ransackable_associations).to include('user')
    end
  end

  describe 'auditing' do
    it 'tracks changes' do
      message = create(:support_message, user: user)
      expect(message.audits.count).to eq(1)

      message.update!(status: 'read')
      expect(message.audits.count).to eq(2)
    end
  end
end
