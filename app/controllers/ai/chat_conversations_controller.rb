module Ai
  class ChatConversationsController < ApplicationController
    before_action :authenticate_user!

    # GET /ai/conversations
    def index
      @conversations = current_user.chat_conversations.recent.limit(50)

      render json: {
        conversations: @conversations.map do |conv|
          {
            id: conv.id,
            title: conv.title || conv.generate_title_from_first_message,
            last_message_at: conv.last_message_at,
            created_at: conv.created_at
          }
        end
      }
    end

    # GET /ai/conversations/:id
    def show
      @conversation = current_user.chat_conversations.find(params[:id])
      @messages = @conversation.chat_messages.chronological

      render json: {
        conversation: {
          id: @conversation.id,
          title: @conversation.title || @conversation.generate_title_from_first_message,
          last_message_at: @conversation.last_message_at,
          created_at: @conversation.created_at
        },
        messages: @messages.map do |msg|
          {
            id: msg.id,
            role: msg.role,
            content: msg.content,
            created_at: msg.created_at
          }
        end
      }
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Conversation not found" }, status: :not_found
    end

    # POST /ai/conversations
    def create
      @conversation = current_user.chat_conversations.create!(
        last_message_at: Time.current
      )

      render json: {
        conversation: {
          id: @conversation.id,
          title: @conversation.title,
          last_message_at: @conversation.last_message_at,
          created_at: @conversation.created_at
        }
      }, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    # POST /ai/conversations/:id/messages
    def add_message
      @conversation = current_user.chat_conversations.find(params[:id])

      unless params[:role].present? && params[:content].present?
        return render json: { error: "Role and content are required" }, status: :unprocessable_entity
      end

      @message = @conversation.chat_messages.create!(
        role: params[:role],
        content: params[:content]
      )

      # Update conversation title from first user message if not set
      if @conversation.title.nil? && params[:role] == 'user'
        @conversation.update!(title: @conversation.generate_title_from_first_message)
      end

      render json: {
        message: {
          id: @message.id,
          role: @message.role,
          content: @message.content,
          created_at: @message.created_at
        }
      }, status: :created
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Conversation not found" }, status: :not_found
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    # DELETE /ai/conversations/:id
    def destroy
      @conversation = current_user.chat_conversations.find(params[:id])
      @conversation.destroy!

      head :no_content
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Conversation not found" }, status: :not_found
    end
  end
end
