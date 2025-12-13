module Auth
  class RequestPasswordReset < ActiveInteraction::Base
      string :email

      validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

      def execute
        user = User.find_by(email: email.downcase.strip)

        if user
          user.generate_password_reset_token
          UserMailer.reset_password_instructions(user).deliver_later
        end

        # Don't reveal if user exists for security
        { user: user }
      end
  end
end
