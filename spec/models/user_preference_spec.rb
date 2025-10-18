require 'rails_helper'

RSpec.describe UserPreference, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:user) }
  end

  describe 'default preferences' do
    let(:user) { create(:user) }
    let(:preference) { UserPreference.create(user: user) }

    it 'sets default sidebar_variant to inset' do
      expect(preference.preferences['sidebar_variant']).to eq('inset')
    end

    it 'sets default theme to system' do
      expect(preference.preferences['theme']).to eq('system')
    end

    it 'has preferences as a hash' do
      expect(preference.preferences).to be_a(Hash)
    end
  end

  describe '#sidebar_variant' do
    let(:user) { create(:user) }
    let(:preference) { UserPreference.create(user: user, preferences: { sidebar_variant: 'floating' }) }

    it 'returns the sidebar variant from preferences' do
      expect(preference.sidebar_variant).to eq('floating')
    end

    it 'returns default inset when not set' do
      pref = UserPreference.create(user: user, preferences: {})
      expect(pref.sidebar_variant).to eq('inset')
    end
  end

  describe '#sidebar_variant=' do
    let(:user) { create(:user) }
    let(:preference) { UserPreference.create(user: user) }

    it 'sets the sidebar variant' do
      preference.sidebar_variant = 'floating'
      expect(preference.preferences['sidebar_variant']).to eq('floating')
    end

    it 'validates sidebar variant value' do
      preference.sidebar_variant = 'invalid'
      expect(preference).not_to be_valid
      expect(preference.errors[:sidebar_variant]).to include('must be sidebar, floating, or inset')
    end

    it 'accepts valid variants' do
      %w[sidebar floating inset].each do |variant|
        preference.sidebar_variant = variant
        expect(preference).to be_valid
      end
    end
  end

  describe '#theme' do
    let(:user) { create(:user) }
    let(:preference) { UserPreference.create(user: user, preferences: { theme: 'dark' }) }

    it 'returns the theme from preferences' do
      expect(preference.theme).to eq('dark')
    end

    it 'returns default system when not set' do
      pref = UserPreference.create(user: user, preferences: {})
      expect(pref.theme).to eq('system')
    end
  end

  describe '#theme=' do
    let(:user) { create(:user) }
    let(:preference) { UserPreference.create(user: user) }

    it 'sets the theme' do
      preference.theme = 'dark'
      expect(preference.preferences['theme']).to eq('dark')
    end

    it 'validates theme value' do
      preference.theme = 'invalid'
      expect(preference).not_to be_valid
      expect(preference.errors[:theme]).to include('must be light, dark, or system')
    end

    it 'accepts valid themes' do
      %w[light dark system].each do |theme|
        preference.theme = theme
        expect(preference).to be_valid
      end
    end
  end
end
