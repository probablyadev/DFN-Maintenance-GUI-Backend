import web
import model
import commandSender
from web import form

web.config.debug = False

# Initialising web.py app object
urls = ('/', 'Index',
        '/app', 'UI',
        '/logout', 'Logout',
        '/cameraon', 'CameraOn',
        '/cameraoff', 'CameraOff',
        '/camerastatus', 'CameraStatus',
        '/internetstatus', 'InternetStatus',
        '/gpscheck', 'GPSCheck')
app = web.application(urls, globals())

# Initialising useful web.py framework variables
render = web.template.render('templates/')
session = web.session.Session(app, web.session.DiskStore('sessions/'))

# Variable for the login form.
loginForm = form.Form(
    form.Textbox("username", description='Username:'),
    form.Password("password", description='Password:'),
    form.Button('Login'))


# Class for login page
class Index:
    def GET(self):
        f = loginForm()
        return render.login(f, '')

    def POST(self):
        f = loginForm()

        if f.validates():  # If form lambdas are valid
            if model.loginAuth(f.d.username, f.d.password):
                Login.login()
            else:
                return render.login(f, 'ERROR: Incorrect credentials.')
        else:
            return render.login(f, 'ERROR: Form entry invalid.')


# Class for Maintenance GUI
if __name__ == '__main__':
    class UI:
        def GET(self):
            if session.get('logged_in', False):
                f = loginForm()
                return render.app()
            else:
                raise web.seeother('/')

class Login:
    @staticmethod
    def login():
        session.logged_in = True
        raise web.seeother('/app')

class Logout:
    def GET(self):
        session.logged_in = False
        raise web.seeother('/')

# Classes for different functions
class CameraOn:
    def GET(self):
            return commandSender.cameraOn()

class CameraOff:
    def GET(self):
        return commandSender.cameraOn()

class CameraStatus:
    def GET(self):
        return commandSender.cameraStatus()

class GPSCheck:
    def GET(self):
        return commandSender.gpsCheck()

class InternetStatus:
    def GET(self):
        return commandSender.internetCheck()

# Start of execution
if __name__ == "__main__":
    app.run()
