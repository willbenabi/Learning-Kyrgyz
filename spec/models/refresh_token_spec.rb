# == Schema Information
#
# Table name: refresh_tokens
#
#  id           :integer          not null, primary key
#  expires_at   :datetime         not null
#  revoked_at   :datetime
#  token_digest :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer          not null
#
# Indexes
#
#  index_refresh_tokens_on_token_digest  (token_digest)
#  index_refresh_tokens_on_user_id       (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe RefreshToken, type: :model do
  describe 'validations' do
    subject { build(:refresh_token) }

    it { should validate_presence_of(:token_digest) }
    it { should validate_presence_of(:expires_at) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'scopes' do
    let(:user) { create(:user) }
    let!(:valid_token) { create(:refresh_token, user: user, expires_at: 30.days.from_now) }
    let!(:expired_token) { create(:refresh_token, user: user, expires_at: 1.day.ago) }
    let!(:revoked_token) { create(:refresh_token, user: user, revoked_at: Time.current) }

    describe '.active' do
      it 'returns only non-revoked, non-expired tokens' do
        expect(RefreshToken.active).to include(valid_token)
        expect(RefreshToken.active).not_to include(expired_token)
        expect(RefreshToken.active).not_to include(revoked_token)
      end
    end
  end

  describe '#generate_token' do
    let(:user) { create(:user) }
    let(:refresh_token) { RefreshToken.create(user: user, expires_at: 30.days.from_now) }

    before do
      refresh_token.generate_token
    end

    it 'generates a token and stores its digest' do
      expect(refresh_token.token).to be_present
      expect(refresh_token.token_digest).to be_present
    end

    it 'returns a unique token' do
      token1 = refresh_token.token
      refresh_token2 = RefreshToken.create(user: user, expires_at: 30.days.from_now)
      refresh_token2.generate_token
      token2 = refresh_token2.token

      expect(token1).not_to eq(token2)
    end
  end

  describe '#active?' do
    let(:user) { create(:user) }

    it 'returns true for non-revoked, non-expired tokens' do
      token = create(:refresh_token, user: user, expires_at: 30.days.from_now)
      expect(token.active?).to be true
    end

    it 'returns false for expired tokens' do
      token = create(:refresh_token, user: user, expires_at: 1.day.ago)
      expect(token.active?).to be false
    end

    it 'returns false for revoked tokens' do
      token = create(:refresh_token, user: user, revoked_at: Time.current)
      expect(token.active?).to be false
    end
  end

  describe '#revoke!' do
    let(:user) { create(:user) }
    let(:token) { create(:refresh_token, user: user) }

    it 'sets revoked_at timestamp' do
      expect {
        token.revoke!
      }.to change { token.revoked_at }.from(nil).to(be_within(1.second).of(Time.current))
    end

    it 'makes the token inactive' do
      token.revoke!
      expect(token.active?).to be false
    end
  end
end
