# Trigger a new build of the parent repo.
curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token ${TRAVIS_PRIVATE_REPO_TOKEN}" \
    -d '{"request": {"branch": "master"}}' 'https://api.travis-ci.com/repo/ScottDay%2FDFN-Maintenance-GUI/requests'
