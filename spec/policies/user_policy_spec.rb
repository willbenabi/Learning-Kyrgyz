require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  let(:admin_user) { create(:user, :admin) }
  let(:regular_user) { create(:user) }
  let(:other_user) { create(:user) }

  describe "#index?" do
    it "grants access to super admins" do
      expect(UserPolicy.new(admin_user, User).index?).to be true
    end

    it "denies access to regular users" do
      expect(UserPolicy.new(regular_user, User).index?).to be false
    end
  end

  describe "#show?" do
    it "allows super admins to view any user" do
      expect(UserPolicy.new(admin_user, other_user).show?).to be true
    end

    it "allows users to view themselves" do
      expect(UserPolicy.new(regular_user, regular_user).show?).to be true
    end

    it "denies users viewing other users" do
      expect(UserPolicy.new(regular_user, other_user).show?).to be false
    end
  end

  describe "#create?" do
    it "grants access to super admins" do
      expect(UserPolicy.new(admin_user, User).create?).to be true
    end

    it "denies access to regular users" do
      expect(UserPolicy.new(regular_user, User).create?).to be false
    end
  end

  describe "#update?" do
    it "allows super admins to update any user" do
      expect(UserPolicy.new(admin_user, other_user).update?).to be true
    end

    it "allows users to update themselves" do
      expect(UserPolicy.new(regular_user, regular_user).update?).to be true
    end

    it "denies users updating other users" do
      expect(UserPolicy.new(regular_user, other_user).update?).to be false
    end
  end

  describe "#destroy?" do
    it "allows super admins to delete other users" do
      expect(UserPolicy.new(admin_user, other_user).destroy?).to be true
    end

    it "denies super admins deleting themselves" do
      expect(UserPolicy.new(admin_user, admin_user).destroy?).to be false
    end

    it "denies regular users deleting anyone" do
      expect(UserPolicy.new(regular_user, other_user).destroy?).to be false
    end

    it "denies users deleting themselves" do
      expect(UserPolicy.new(regular_user, regular_user).destroy?).to be false
    end
  end

  describe "#resend_invitation?" do
    it "grants access to admins" do
      expect(UserPolicy.new(admin_user, other_user).resend_invitation?).to be true
    end

    it "denies access to regular users" do
      expect(UserPolicy.new(regular_user, other_user).resend_invitation?).to be false
    end
  end

  describe "Scope" do
    it "returns all users for super admins" do
      user1 = create(:user)
      user2 = create(:user)

      scope = Pundit.policy_scope!(admin_user, User)
      expect(scope).to include(user1, user2, admin_user)
    end

    it "returns only self for regular users" do
      user1 = create(:user)

      scope = Pundit.policy_scope!(regular_user, User)
      expect(scope).to eq([ regular_user ])
      expect(scope).not_to include(user1)
    end
  end

  describe "#permitted_attributes_for_create" do
    it "includes basic user attributes" do
      policy = UserPolicy.new(admin_user, User.new)
      expect(policy.permitted_attributes_for_create).to include(:name, :email, :password, :password_confirmation)
    end

    it "does not allow role assignment" do
      policy = UserPolicy.new(admin_user, User.new)
      expect(policy.permitted_attributes_for_create).not_to include(:role)
    end
  end

  describe "#permitted_attributes_for_update" do
    it "includes basic user attributes" do
      policy = UserPolicy.new(admin_user, other_user)
      expect(policy.permitted_attributes_for_update).to include(:name, :email, :password, :password_confirmation)
    end

    it "does not allow role assignment" do
      policy = UserPolicy.new(admin_user, other_user)
      expect(policy.permitted_attributes_for_update).not_to include(:role)
    end
  end
end
