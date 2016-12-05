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
        '/intervaltest', 'IntervalTest',
        '/enablehdd', 'EnableHDD',
        '/disablehdd', 'DisableHDD',
        '/unmounthdd', 'UnmountHDD',
        '/hddcheck', 'CheckHDD',
        # TODO
        '/data0check', 'Data0Check',
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

# Classes for different functions of the GUI
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

class EnableHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.hddOn()
            statusFeedback, hdd1Boolean, hdd2Boolean = commandSender.hddStatus()
            data['consoleFeedback'] += statusFeedback
            data['HDD1Status'] = hdd1Boolean
            data['HDD2Status'] = hdd2Boolean
            outJSON = json.dumps(data)
            return outJSON

class DisableHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.hddOff()
            statusFeedback, hdd1Boolean, hdd2Boolean = commandSender.hddStatus()
            data['consoleFeedback'] += statusFeedback
            data['HDD1Status'] = hdd1Boolean
            data['HDD2Status'] = hdd2Boolean
            outJSON = json.dumps(data)
            return outJSON

class UnmountHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.unmountHDD()
            statusFeedback, hdd1Boolean, hdd2Boolean = commandSender.hddStatus()
            data['consoleFeedback'] += statusFeedback
            data['HDD1Status'] = hdd1Boolean
            data['HDD2Status'] = hdd2Boolean
            outJSON = json.dumps(data)
            return outJSON

class CheckHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['HDD1Status'], data['HDD2Status'] = commandSender.hddStatus()
            outJSON = json.dumps(data)
            return outJSON

class GPSCheck:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['gpsStatus'] = commandSender.gpsStatus()
            outJSON = json.dumps(data)
            return outJSON

class IntervalTest:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['intervalTestResult'] = commandSender.intervalTest()
            outJSON = json.dumps(data)
            return outJSON

class SystemStatus:
    def GET(self):
        if LoginChecker.loggedIn():
            # Check status of system
            cameraFeedback, cameraBoolean = commandSender.cameraStatus()
            gpsFeedback, gpsBoolean = commandSender.gpsStatus()
            internetFeedback, internetBoolean = commandSender.internetStatus()
            intervalFeedback, intervalBoolean = commandSender.intervalTest()
            extHDDFeedback, hdd1Boolean, hdd2Boolean = commandSender.hddStatus()

            # Encode to JSON
            data = {}
            data['consoleFeedback'] = cameraFeedback + gpsFeedback + internetFeedback + intervalFeedback + extHDDFeedback
            data['cameraStatus'] = cameraBoolean
            data['gpsStatus'] = gpsBoolean
            data['internetStatus'] = internetBoolean
            data['intervalTestResult'] = intervalBoolean
            data['HDD1Status'] = hdd1Boolean
            data['HDD2Status'] = hdd2Boolean
            outJSON = json.dumps(data)
            return outJSON

# Start of execution
if __name__ == "__main__":
    app.run()
