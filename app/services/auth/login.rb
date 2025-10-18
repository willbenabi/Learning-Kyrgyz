module Services
  module Auth
    class Login < ActiveInteraction::Base
      string :email
      string :password

      validate :authenticate_user

      def execute
        # Generate JWT token
        jwt_token = JwtService.encode(user_id: user.id)

        # Generate refresh token
        refresh_token_data = JwtService.generate_refresh_token(user)

        {
          user: user,
          jwt_token: jwt_token,
          refresh_token: refresh_token_data[:token]
        }
      end

      private

      attr_reader :user

      def authenticate_user
        @user = User.find_by(email: email.downcase.strip)

        unless @user&.authenticate(password)
          errors.add(:base, 'Invalid email or password')
        end
      end
    end
  end
end
