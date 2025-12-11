class Admin::SupportMessagesController < Admin::BaseController
  # GET /admin/support_messages
  def index
    render inertia: 'Admin/SupportMessages/Index', props: index_props
  end

  # PATCH /admin/support_messages/:id/mark_as_read
  def mark_as_read
    message = SupportMessage.find(params[:id])
    message.mark_as_read!

    redirect_to admin_support_messages_path, notice: 'Message marked as read'
  end

  # DELETE /admin/support_messages/:id
  def destroy
    message = SupportMessage.find(params[:id])
    message.destroy!

    redirect_to admin_support_messages_path, notice: 'Message deleted successfully'
  end

  private

  def index_props
    search_params = params[:q] || {}
    page = params[:page]&.to_i || 1
    per_page = params[:per_page]&.to_i || 25

    q = SupportMessage.includes(:user).ransack(search_params)
    messages = q.result.recent

    pagy, paginated_messages = pagy(messages, page: page, limit: per_page)

    {
      support_messages: paginated_messages.map { |msg| serialize_message(msg) },
      pagination: pagination_props(pagy),
      unread_count: SupportMessage.unread.count,
      stats: {
        total: SupportMessage.count,
        unread: SupportMessage.unread.count,
        read: SupportMessage.read.count
      }
    }
  end

  def serialize_message(message)
    {
      id: message.id,
      subject: message.subject,
      message: message.message,
      status: message.status,
      read_at: message.read_at&.iso8601,
      created_at: message.created_at.iso8601,
      user: {
        id: message.user.id,
        name: message.user.name,
        email: message.user.email
      }
    }
  end
end
