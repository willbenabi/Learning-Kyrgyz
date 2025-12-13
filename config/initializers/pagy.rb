require "pagy/extras/overflow"

# Pagy configuration
Pagy::DEFAULT[:items] = 20
Pagy::DEFAULT[:overflow] = :last_page
