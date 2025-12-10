class Admin::DatabaseController < Admin::BaseController
  # GET /admin/database
  def index
    render inertia: 'Admin/Database/Index', props: index_props
  end

  # GET /admin/database/:table
  def show
    table_name = params[:table]

    unless valid_table?(table_name)
      return render json: { error: 'Invalid table name' }, status: :bad_request
    end

    model_class = table_name.classify.constantize

    # Pagination
    page = params[:page]&.to_i || 1
    per_page = params[:per_page]&.to_i || 25

    # Search with Ransack if available
    search_params = params[:q] || {}
    records = if model_class.respond_to?(:ransack)
      q = model_class.ransack(search_params)
      q.result
    else
      model_class.all
    end

    # Apply pagination
    pagy, paginated_records = pagy(records, page: page, limit: per_page)

    render json: {
      records: serialize_records(paginated_records),
      columns: get_table_columns(model_class),
      pagination: pagy_metadata(pagy)
    }
  rescue NameError
    render json: { error: 'Table not found' }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  # POST /admin/database/export
  def export
    table_name = params[:table]
    format = params[:format] || 'csv'

    unless valid_table?(table_name)
      return render json: { error: 'Invalid table name' }, status: :bad_request
    end

    model_class = table_name.classify.constantize
    records = model_class.all

    case format
    when 'csv'
      send_data generate_csv(records, model_class),
                filename: "#{table_name}_#{Time.current.to_i}.csv",
                type: 'text/csv'
    when 'json'
      send_data records.to_json,
                filename: "#{table_name}_#{Time.current.to_i}.json",
                type: 'application/json'
    else
      render json: { error: 'Invalid format' }, status: :bad_request
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  # POST /admin/database/query
  def query
    sql = params[:sql]

    if sql.blank?
      return render json: { error: 'SQL query is required' }, status: :bad_request
    end

    # Security: Only allow SELECT queries
    unless sql.strip.match?(/\ASELECT/i)
      return render json: { error: 'Only SELECT queries are allowed' }, status: :forbidden
    end

    result = ActiveRecord::Base.connection.execute(sql)

    render json: {
      columns: result.columns,
      rows: result.to_a,
      row_count: result.count
    }
  rescue ActiveRecord::StatementInvalid => e
    render json: { error: "SQL Error: #{e.message}" }, status: :bad_request
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  private

  def index_props
    {
      tables: get_available_tables,
      statistics: get_database_statistics
    }
  end

  def get_available_tables
    ApplicationRecord.descendants.map do |model|
      next if model.abstract_class?

      {
        name: model.table_name,
        model_name: model.name,
        count: model.count,
        columns: model.column_names.size
      }
    end.compact.sort_by { |t| t[:name] }
  end

  def get_database_statistics
    {
      total_tables: ApplicationRecord.descendants.reject(&:abstract_class?).size,
      total_records: ApplicationRecord.descendants.reject(&:abstract_class?).sum(&:count),
      database_size: get_database_size
    }
  end

  def get_database_size
    # SQLite specific - for production PostgreSQL, use different query
    result = ActiveRecord::Base.connection.execute(
      "SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size();"
    )
    size_bytes = result.first['size']
    "#{(size_bytes.to_f / 1.megabyte).round(2)} MB"
  rescue
    "N/A"
  end

  def valid_table?(table_name)
    ApplicationRecord.descendants.any? do |model|
      !model.abstract_class? && model.table_name == table_name
    end
  end

  def get_table_columns(model_class)
    model_class.columns.map do |column|
      {
        name: column.name,
        type: column.type.to_s,
        null: column.null,
        default: column.default
      }
    end
  end

  def serialize_records(records)
    records.map do |record|
      record.attributes.transform_values do |value|
        case value
        when Time, DateTime, Date
          value.iso8601
        when ActiveStorage::Attached
          nil
        else
          value
        end
      end
    end
  end

  def generate_csv(records, model_class)
    require 'csv'

    CSV.generate(headers: true) do |csv|
      columns = model_class.column_names
      csv << columns

      records.find_each do |record|
        csv << columns.map { |col| record.send(col) }
      end
    end
  end
end
