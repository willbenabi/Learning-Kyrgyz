module Auth
  class ResetPassword < ActiveInteraction::Base
      string :token
      string :password
      string :password_confirmation

      validate :verify_token
      validate :verify_password_match

      def execute
        @user.password = password
        @user.password_confirmation = password_confirmation

        if @user.save
          @user.clear_password_reset
          { user: @user }
        else
          @user.errors.each do |error|
            errors.add(error.attribute, error.message)
          end
          errors.add(:base, "Could not reset password")
        end
      end

      private

      def verify_token
        # Find user by matching token digest
        User.find_each do |user|
          next unless user.reset_password_digest

          begin
            if BCrypt::Password.new(user.reset_password_digest) == token
              if user.password_reset_expired?
                errors.add(:base, "Invalid or expired password reset token")
                return
              end

              @user = user
              return
            end
          rescue BCrypt::Errors::InvalidHash
            next
          end
        end

        errors.add(:base, "Invalid or expired password reset token") unless @user
      end

      def verify_password_match
        if password != password_confirmation
          errors.add(:password_confirmation, "doesn't match password")
        end
      end
  end
end
