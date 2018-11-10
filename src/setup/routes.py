def routes(connexion_app):
	connexion_app.add_api('src/api/camera/swagger.yaml')
	connexion_app.add_api('src/api/config/swagger.yaml')
	connexion_app.add_api('src/api/location/swagger.yaml')
	connexion_app.add_api('src/api/network/swagger.yaml')
	connexion_app.add_api('src/api/session/swagger.yaml')
	connexion_app.add_api('src/api/storage/swagger.yaml')
	connexion_app.add_api('src/api/power/swagger.yaml')
