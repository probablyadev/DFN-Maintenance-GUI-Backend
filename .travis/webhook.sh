curl -s -X POST -H Content-Type: application/json \
	-H Accept: application/json -H Travis-API-Version: 3 \
	-H Authorization: token ${TRAVIS_PRIVATE_REPO_TOKEN} \
	https://api.travis-ci.com/repo/ScottDay/DFN-Maintenance-GUI/requests
