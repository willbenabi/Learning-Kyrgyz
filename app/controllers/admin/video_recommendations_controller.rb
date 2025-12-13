class Admin::VideoRecommendationsController < Admin::BaseController
  before_action :set_video_recommendation, only: [:show, :edit, :update, :destroy, :toggle_active]

  def index
    @video_recommendations = VideoRecommendation.all

    # Apply level filter
    if params[:level_filter].present? && params[:level_filter] != "all"
      @video_recommendations = @video_recommendations.where(level: params[:level_filter])
    end

    # Apply status filter
    if params[:status_filter].present? && params[:status_filter] != "all"
      @video_recommendations = @video_recommendations.where(active: params[:status_filter] == "active")
    end

    # Search
    if params[:search].present?
      @video_recommendations = @video_recommendations.where(
        "title LIKE ? OR description LIKE ?",
        "%#{params[:search]}%",
        "%#{params[:search]}%"
      )
    end

    # Sorting
    sort_column = params[:sort] || "created_at"
    sort_direction = params[:direction] || "desc"
    @video_recommendations = @video_recommendations.order("#{sort_column} #{sort_direction}")

    @pagy, @video_recommendations = pagy(@video_recommendations, items: 20)

    render inertia: "Admin/VideoRecommendations/Index", props: index_props
  end

  def show
    render inertia: "Admin/VideoRecommendations/Show", props: {
      video_recommendation: video_recommendation_props(@video_recommendation)
    }
  end

  def new
    @video_recommendation = VideoRecommendation.new
    render inertia: "Admin/VideoRecommendations/New", props: form_props
  end

  def create
    @video_recommendation = VideoRecommendation.new(video_recommendation_params)

    if @video_recommendation.save
      redirect_to admin_video_recommendations_path, notice: "Video recommendation created successfully"
    else
      render inertia: "Admin/VideoRecommendations/New", props: form_props.merge(
        errors: @video_recommendation.errors.full_messages
      ), status: :unprocessable_entity
    end
  end

  def edit
    render inertia: "Admin/VideoRecommendations/Edit", props: form_props.merge(
      video_recommendation: video_recommendation_props(@video_recommendation)
    )
  end

  def update
    if @video_recommendation.update(video_recommendation_params)
      redirect_to admin_video_recommendations_path, notice: "Video recommendation updated successfully"
    else
      render inertia: "Admin/VideoRecommendations/Edit", props: form_props.merge(
        video_recommendation: video_recommendation_props(@video_recommendation),
        errors: @video_recommendation.errors.full_messages
      ), status: :unprocessable_entity
    end
  end

  def destroy
    @video_recommendation.destroy!
    redirect_to admin_video_recommendations_path, notice: "Video recommendation deleted successfully"
  end

  def toggle_active
    @video_recommendation.update!(active: !@video_recommendation.active)
    redirect_to admin_video_recommendations_path, notice: "Video recommendation #{@video_recommendation.active? ? 'activated' : 'deactivated'}"
  end

  private

  def set_video_recommendation
    @video_recommendation = VideoRecommendation.find(params[:id])
  end

  def video_recommendation_params
    params.require(:video_recommendation).permit(
      :level, :title, :description, :video_url, :thumbnail_url, :category, :active
    )
  end

  def index_props
    {
      video_recommendations: @video_recommendations.map { |vr| video_recommendation_props(vr) },
      pagination: pagination_props(@pagy),
      filters: {
        search: params[:search],
        level_filter: params[:level_filter] || "all",
        status_filter: params[:status_filter] || "all",
        sort: params[:sort] || "created_at",
        direction: params[:direction] || "desc"
      },
      levels: VideoRecommendation::LEVELS,
      categories: VideoRecommendation::CATEGORIES
    }
  end

  def form_props
    {
      levels: VideoRecommendation::LEVELS,
      categories: VideoRecommendation::CATEGORIES
    }
  end

  def video_recommendation_props(vr)
    {
      id: vr.id,
      level: vr.level,
      title: vr.title,
      description: vr.description,
      video_url: vr.video_url,
      thumbnail_url: vr.thumbnail_url,
      category: vr.category,
      active: vr.active,
      last_shown_at: vr.last_shown_at,
      created_at: vr.created_at,
      updated_at: vr.updated_at
    }
  end
end
