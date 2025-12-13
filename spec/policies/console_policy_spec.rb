require 'rails_helper'

RSpec.describe ConsolePolicy, type: :policy do
  let(:regular_user) { create(:user) }
  let(:admin_user) { create(:user, :admin) }

  describe "#index?" do
    it "denies access for regular users" do
      expect(ConsolePolicy.new(regular_user, :console).index?).to be false
    end

    it "grants access for super admin users" do
      expect(ConsolePolicy.new(admin_user, :console).index?).to be true
    end
  end
end
