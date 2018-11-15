def routes(connexion_app, args):
	connexion_app.add_api('src/api/camera/swagger.yaml')
	connexion_app.add_api('src/api/config/swagger.yaml')
	connexion_app.add_api('src/api/location/swagger.yaml')
	connexion_app.add_api('src/api/network/swagger.yaml')
	connexion_app.add_api('src/api/session/swagger.yaml')
	connexion_app.add_api('src/api/storage/swagger.yaml')
	connexion_app.add_api('src/api/power/swagger.yaml')

	if args.dev is False:
		prod_routes(connexion_app)


def prod_routes(connexion_app):
	from flask import send_from_directory

	app = connexion_app.app

	@app.route('/')
	@app.route('/login')
	@app.route('/app')
	@app.route('/app/storage')
	@app.route('/app/camera')
	@app.route('/app/network')
	@app.route('/app/location')
	@app.route('/app/advanced')
	@app.route('/404')
	def index():
		return send_from_directory('dist', 'index.html')

	@app.route('/assets/<filename>')
	@app.route('/app/assets/<filename>')
	def assets(filename):
		return send_from_directory('dist/assets', filename)

	@app.route('/<path:dummy>')
	def fallback(dummy):
		return send_from_directory('dist', 'index.html')
