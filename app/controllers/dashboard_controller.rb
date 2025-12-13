class DashboardController < ApplicationController
  def index
    render inertia: "Dashboard", props: {
      breadcrumbs: [
        { label: 'Dashboard' }
      ]
    }
  end
end
