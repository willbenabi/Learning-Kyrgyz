module Services
  module Auth
    class RefreshTokenService < ActiveInteraction::Base
      string :refresh_token

      validate :verify_token

      def execute
        # Revoke old token
        @refresh_token_record.revoke!

        # Generate new JWT token
        jwt_token = JwtService.encode(user_id: @refresh_token_record.user_id)

        # Generate new refresh token
        new_refresh_token = JwtService.generate_refresh_token(@refresh_token_record.user)

        {
          user: @refresh_token_record.user,
          jwt_token: jwt_token,
          refresh_token: new_refresh_token[:token]
        }
      end

      private

      def verify_token
        @refresh_token_record = JwtService.verify_refresh_token(refresh_token)

        unless @refresh_token_record
          errors.add(:base, 'Invalid or expired refresh token')
        end
      end
    end
  end
end
