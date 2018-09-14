from flask import current_app, send_from_directory


@current_app.route('/')
def index():
	return send_from_directory('../dist', 'index.html')


@current_app.route('/<filename>')
def page(filename):
	return send_from_directory('../dist', 'index.html')


@current_app.route('/assets/<filename>')
def assets(filename):
	return send_from_directory('../dist/assets', filename)
