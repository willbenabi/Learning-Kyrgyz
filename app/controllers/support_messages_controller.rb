class SupportMessagesController < ApplicationController
  before_action :authenticate_user!

  # POST /support_messages
  def create
    message = current_user.support_messages.build(support_message_params)

    if message.save
      render json: {
        message: 'Your message has been sent to support. We will review it shortly.',
        support_message: {
          id: message.id,
          subject: message.subject,
          created_at: message.created_at.iso8601
        }
      }, status: :created
    else
      render json: {
        errors: message.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def support_message_params
    params.require(:support_message).permit(:subject, :message)
  end
end
