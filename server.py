import web
import model
import commandSender
from web import form
import json

web.config.debug = False

# Initialising web.py app object
urls = ('/', 'Index',
        '/app', 'UI',
        '/logout', 'Logout',
        '/cameraon', 'CameraOn',
        '/cameraoff', 'CameraOff',
        '/gpscheck', 'GPSCheck',
        '/systemstatus', 'SystemStatus')
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
            if LoginChecker.loggedIn():
                f = loginForm()
                return render.app()

class Login:
    @staticmethod
    def login():
        session.logged_in = True
        raise web.seeother('/app')

class Logout:
    def GET(self):
        session.logged_in = False
        raise web.seeother('/')

class LoginChecker:
    @staticmethod
    def loggedIn():
        if session.get('logged_in', False):
            return True
        else:
            raise web.seeother('/')

# Classes for different functions
class CameraOn:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.cameraOn()
            statusFeedback, statusBoolean = commandSender.cameraStatus()
            data['consoleFeedback'] += statusFeedback
            data['cameraStatus'] = statusBoolean
            outJSON = json.dumps(data)
            return outJSON


class CameraOff:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.cameraOff()
            statusFeedback, statusBoolean = commandSender.cameraStatus()
            data['consoleFeedback'] += statusFeedback
            data['cameraStatus'] = statusBoolean
            outJSON = json.dumps(data)
            return outJSON


class GPSCheck:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['gpsStatus'] = commandSender.gpsStatus()
            outJSON = json.dumps(data)
            return outJSON


class SystemStatus:
    def GET(self):
        if LoginChecker.loggedIn():
            # Check status of system
            cameraFeedback, cameraBoolean = commandSender.cameraStatus()
            gpsFeedback, gpsBoolean = commandSender.gpsStatus()
            internetFeedback, internetBoolean = commandSender.internetStatus()

            # Encode to JSON
            data = {}
            data['consoleFeedback'] = cameraFeedback + gpsFeedback + internetFeedback
            data['cameraStatus'] = cameraBoolean
            data['gpsStatus'] = gpsBoolean
            data['internetStatus'] = internetBoolean
            outJSON = json.dumps(data)
            return outJSON

# Start of execution
if __name__ == "__main__":
    app.run()
