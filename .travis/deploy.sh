# Set an option to exit immediately if any error appears.
set -o errexit

master_branch_request() {
	# Trigger build on build repo develop branch, reset its counter.
	BODY='{
		"request": {
			"branch": "master",
			"message": "Backend API Build Request: release",
			"config": {
				"env": "REQUEST_TYPE=release"
			}
		}
	}'

	curl -s -X POST \
		-H "Content-Type: application/json" \
		-H "Accept: application/json" \
		-H "Travis-API-Version: 3" \
		-H "Authorization: token ${TRAVIS_PRIVATE_REPO_TOKEN}" \
		-d "$BODY" \
		'https://api.travis-ci.com/repo/ScottDay%2FDFN-Maintenance-GUI/requests'
}


develop_branch_request() {
	# Trigger build on build repo develop branch, increment its counter.
	BODY='{
		"request": {
			"branch": "master",
			"message": "Backend API Build Request: dev",
			"config": {
				"env": "REQUEST_TYPE=dev"
			}
		}
	}'

	curl -s -X POST \
		-H "Content-Type: application/json" \
		-H "Accept: application/json" \
		-H "Travis-API-Version: 3" \
		-H "Authorization: token ${TRAVIS_PRIVATE_REPO_TOKEN}" \
		-d "$BODY" \
		'https://api.travis-ci.com/repo/ScottDay%2FDFN-Maintenance-GUI/requests'
}


# Trigger a new build of the parent repo.
if [ "$TRAVIS_BRANCH" == "master" ]; then
	master_branch_request
elif [ "$TRAVIS_BRANCH" == "develop" ]; then
	develop_branch_request
fi
