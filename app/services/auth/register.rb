class Auth::Register < ActiveInteraction::Base
  string :name
  string :email
  string :password
  string :password_confirmation

  validate :passwords_match
  validate :email_not_taken

  def execute
    user = User.create!(
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      admin: false
    )

    # Generate tokens
    jwt_token = Auth::JwtService.encode_for_user(user)
    refresh_token_record = user.refresh_tokens.new(expires_at: 30.days.from_now)
    refresh_token_record.generate_token
    refresh_token_record.save!

    {
      user: user,
      jwt_token: jwt_token,
      refresh_token: refresh_token_record.token
    }
  rescue ActiveRecord::RecordInvalid => e
    errors.add(:base, e.record.errors.full_messages.join(", "))
    nil
  end

  private

  def passwords_match
    if password != password_confirmation
      errors.add(:password_confirmation, "doesn't match password")
    end
  end

  def email_not_taken
    if User.exists?(email: email.downcase.strip)
      errors.add(:email, "is already taken")
    end
  end
end
