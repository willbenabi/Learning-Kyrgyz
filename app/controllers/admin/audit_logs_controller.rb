class Admin::AuditLogsController < Admin::BaseController
  after_action :verify_authorized
  after_action :verify_policy_scoped, only: :index

  # GET /admin/audit_logs
  def index
    authorize Audited::Audit

    # Start with base scope
    audits = policy_scope(Audited::Audit).where(auditable_type: "User").includes(:user)

    # Search by user name or email (complex OR logic - better with plain SQL)
    if params[:search].present?
      user_ids = User.ransack(name_or_email_cont: params[:search]).result.pluck(:id)
      if user_ids.any?
        audits = audits.where("auditable_id IN (?) OR user_id IN (?)", user_ids, user_ids)
      else
        audits = audits.none # Return empty if no users match
      end
    end

    # Filter by action type (simple where clause)
    if params[:action_filter].present?
      audits = audits.where(action: params[:action_filter])
    end

    # Use Ransack for date range only
    search_params = {}

    if params[:created_from].present?
      search_params[:created_at_gteq] = Date.parse(params[:created_from]).beginning_of_day
    end

    if params[:created_to].present?
      search_params[:created_at_lteq] = Date.parse(params[:created_to]).end_of_day
    end

    @q = audits.ransack(search_params)
    audits = @q.result

    # Apply sorting with ActiveRecord (supports NULLS LAST if needed in future)
    sort_column = params[:sort_column].presence || "created_at"
    sort_direction = params[:sort_direction].presence || "desc"

    allowed_columns = %w[created_at action]
    sort_column = "created_at" unless allowed_columns.include?(sort_column)
    sort_direction = "desc" unless %w[asc desc].include?(sort_direction)

    audits = audits.order("#{sort_column} #{sort_direction}")

    @pagy, @audits = pagy(audits, items: 20)

    render inertia: "Admin/AuditLogs/Index", props: {
      audits: @audits.map { |a| audit_props(a) },
      pagination: pagination_props(@pagy),
      filters: {
        search: params[:search],
        action_filter: params[:action_filter],
        created_from: params[:created_from],
        created_to: params[:created_to],
        sort_column: sort_column,
        sort_direction: sort_direction
      }
    }
  end

  private

  def audit_props(audit)
    {
      id: audit.id,
      action: audit.action,
      auditable_type: audit.auditable_type,
      auditable_id: audit.auditable_id,
      user_id: audit.user_id,
      user_name: audit.user&.name || "System",
      user_email: audit.user&.email,
      audited_changes: audit.audited_changes,
      created_at: audit.created_at,
      remote_address: audit.remote_address
    }
  end
end
