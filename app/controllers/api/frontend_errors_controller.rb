# frozen_string_literal: true

module Api
  # Receives frontend errors and logs them to log/frontend_errors.log
  class FrontendErrorsController < ApplicationController
    # Skip authentication - errors can occur before/during login
    skip_before_action :authenticate_user!
    skip_after_action :verify_authorized, raise: false

    def create
      errors = params[:errors] || []

      errors.each do |error|
        log_frontend_error(error)
      end

      head :ok
    end

    private

    def log_frontend_error(error)
      # Get user info if authenticated
      user_info = if current_user
        "user_id=#{current_user.id} email=#{current_user.email}"
      else
        "user=anonymous"
      end

      # Format the log entry
      log_entry = [
        "=" * 80,
        "[#{Time.current.iso8601}] FRONTEND ERROR",
        "Type: #{error['type']}",
        "URL: #{error['url']}",
        "User: #{user_info}",
        "Message: #{error['message']}",
        error['source'] ? "Source: #{error['source']}:#{error['line']}:#{error['column']}" : nil,
        error['stack'] ? "Stack:\n#{error['stack']}" : nil,
        error['componentStack'] ? "Component Stack:\n#{error['componentStack']}" : nil,
        "User Agent: #{error['userAgent']}",
        ""
      ].compact.join("\n")

      # Write to dedicated frontend errors log
      frontend_logger.info(log_entry)
    end

    def frontend_logger
      @frontend_logger ||= Logger.new(
        Rails.root.join("log", "frontend_errors.log"),
        "daily" # Rotate daily
      ).tap do |logger|
        logger.formatter = proc { |_, _, _, msg| "#{msg}\n" }
      end
    end

    # Allow errors array in params
    def frontend_error_params
      params.permit(errors: [:type, :message, :stack, :source, :line, :column, :componentStack, :url, :userAgent, :timestamp])
    end
  end
end
