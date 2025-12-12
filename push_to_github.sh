#!/bin/bash
set -e

# This script pushes code to GitHub using the GITHUB_TOKEN environment variable
# The token must be set in the Integrations tab

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GITHUB_TOKEN not set"
    exit 1
fi

# Update remote URL with token
git remote remove origin 2>/dev/null || true
git remote add origin "https://${GITHUB_TOKEN}@github.com/willbenabi/Learning-Kyrgyz.git"

echo "Pushing main branch..."
git push -u origin main

echo "Pushing current feature branch..."
CURRENT_BRANCH=$(git branch --show-current)
git push -u origin "$CURRENT_BRANCH"

echo "✅ Successfully pushed all code to your repository!"
echo "You can view it at: https://github.com/willbenabi/Learning-Kyrgyz"
