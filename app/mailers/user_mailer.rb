class UserMailer < ApplicationMailer
  def reset_password_instructions(user)
    @user = user
    @reset_url = password_reset_url(token: user.reset_password_token)

    mail(
      to: user.email,
      subject: "Password Reset Instructions"
    )
  end
end
