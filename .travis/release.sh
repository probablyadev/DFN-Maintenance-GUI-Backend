# Set an option to exit immediately if any error appears.
set -o errexit

# Fetch repo tags from git.
git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/*
git fetch --tags

# Publish the new version tags to git.
npm install
npx semantic-release
