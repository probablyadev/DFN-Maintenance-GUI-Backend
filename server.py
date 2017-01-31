#!/usr/bin/env python

import web
from web import form
import os, model, commandSender, json, base64, datetime

web.config.debug = False
web.config.session_parameters['timeout'] = 7200

# Initialising web.py app object
urls = ('/', 'Index',
        '/app', 'UI',
        '/logout', 'Logout',
        '/connectioncheck', 'ConnectionCheck',
        '/cameraon', 'CameraOn',
        '/cameraoff', 'CameraOff',
        '/videocameraon', 'VideoCameraOn',
        '/videocameraoff', 'VideoCameraOff',
        '/camerastatus', 'CameraStatus',
        '/findpictures', 'FindPictures',
        '/gpscheck', 'GPSCheck',
        '/timezonechange', 'TimezoneChange',
        '/outputTime', 'OutputTime',
        '/intervaltest', 'IntervalTest',
        '/previntervaltest', 'PrevIntervalTest',
        '/enablehdd', 'EnableHDD',
        '/disablehdd', 'DisableHDD',
        '/mounthdd', 'MountHDD',
        '/unmounthdd', 'UnmountHDD',
        '/formathdd', 'FormatHDD',
        '/smarttest', 'SmartTest',
        '/hddcheck', 'CheckHDD',
        '/internetcheck', 'InternetCheck',
        '/restartmodem', 'RestartModem',
        '/vpncheck', 'VPNCheck',
        '/restartvpn', 'RestartVPN',
        '/systemstatus', 'SystemStatus',
        '/statusconfig', 'StatusConfig',
        '/getlatestlog', 'LatestLog',
        '/getlatestprevlog', 'LatestPrevLog',
        '/populateconfigbox', 'PopulateConfigBox',
        '/updateconfigfile', 'UpdateConfigFile')
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

class ConnectionCheck:
    def GET(self):
        data = {}
        data['connected'] = True
        outJSON = json.dumps(data)
        return outJSON

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

class VideoCameraOn:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.videoCameraOn()
            outJSON = json.dumps(data)
            return outJSON

class VideoCameraOff:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.videoCameraOff()
            outJSON = json.dumps(data)
            return outJSON

class CameraStatus:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['cameraStatus'] = commandSender.cameraStatus()
            outJSON = json.dumps(data)
            return outJSON

class FindPictures:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['foundDirectory'], data['filesize'], data['filepath'] = commandSender.findPictures(web.input())
            outJSON = json.dumps(data)
            return outJSON

class EnableHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.hddOn()
            statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
            data['consoleFeedback'] += statusFeedback
            outJSON = json.dumps(data)
            return outJSON

class DisableHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.hddOff()
            statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
            data['consoleFeedback'] += statusFeedback
            outJSON = json.dumps(data)
            return outJSON

class MountHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.mountHDD()
            statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
            data['consoleFeedback'] += statusFeedback
            outJSON = json.dumps(data)
            return outJSON

class UnmountHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.unmountHDD()
            statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
            data['consoleFeedback'] += statusFeedback
            outJSON = json.dumps(data)
            return outJSON

class FormatHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            checkData = [web.input().installChecked, web.input().data1Checked, web.input().data2Checked]
            data['consoleFeedback'] = commandSender.formatHDD(checkData)
            statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
            data['consoleFeedback'] += statusFeedback
            outJSON = json.dumps(data)
            return outJSON

class SmartTest:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.smartTest()
            outJSON = json.dumps(data)
            return outJSON

class CheckHDD:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
            outJSON = json.dumps(data)
            return outJSON

class GPSCheck:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['gpsStatus'] = commandSender.gpsStatus()
            outJSON = json.dumps(data)
            return outJSON

class TimezoneChange:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            timezone = web.input().zone
            data['consoleFeedback'] = commandSender.timezoneChange(timezone)
            outJSON = json.dumps(data)
            return outJSON

class OutputTime:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.outputTime()
            outJSON = json.dumps(data)
            return outJSON

class IntervalTest:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['intervalTestResult'] = commandSender.intervalTest()
            outJSON = json.dumps(data)
            return outJSON

class PrevIntervalTest:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.prevIntervalTest()
            outJSON = json.dumps(data)
            return outJSON

class InternetCheck:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['internetStatus'] = commandSender.internetStatus()
            outJSON = json.dumps(data)
            return outJSON

class RestartModem:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            restartFeedback = commandSender.restartModem()
            statusFeedback, data['internetStatus'] = commandSender.internetStatus()
            data['consoleFeedback'] = restartFeedback + statusFeedback
            outJSON = json.dumps(data)
            return outJSON


class VPNCheck:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['vpnStatus'] = commandSender.vpnStatus()
            outJSON = json.dumps(data)
            return outJSON

class RestartVPN:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            restartFeedback = commandSender.restartVPN()
            statusFeedback, data['vpnStatus'] = commandSender.vpnStatus()
            data['consoleFeedback'] = restartFeedback + statusFeedback
            outJSON = json.dumps(data)
            return outJSON

class StatusConfig:
    def GET(self):
        if LoginChecker.loggedIn():
            path = "/opt/dfn-software/dfnstation.cfg"
            if os.path.exists(path):
                getFile = file(path, 'rb')
                web.header('Content-type', 'application/octet-stream')
                web.header('Content-transfer-encoding', 'base64')
                return base64.standard_b64encode(getFile.read())
            else:
                raise web.notfound()

class LatestLog:
    def GET(self):
        if LoginChecker.loggedIn():
            path = "/data0/latest/" + commandSender.getLog("latest")
            if os.path.exists(path):
                data = {}
                getFile = file(path, 'rb')
                data['file'] = getFile.read()
                filestate = os.stat(path)
                data['timestamp'] = datetime.datetime.fromtimestamp(filestate.st_mtime).strftime('%d-%m-%Y %H:%M:%S')
                outJSON = json.dumps(data)
                return outJSON
            else:
                raise web.notfound()

class LatestPrevLog:
    def GET(self):
        if LoginChecker.loggedIn():
            path = "/data0/latest_prev/" + commandSender.getLog("latest_prev")
            if os.path.exists(path):
                data = {}
                getFile = file(path, 'rb')
                data['file'] = getFile.read()
                filestate = os.stat(path)
                data['timestamp'] = datetime.datetime.fromtimestamp(filestate.st_mtime).strftime('%d-%m-%Y %H:%M:%S')
                outJSON = json.dumps(data)
                return outJSON
            else:
                raise web.notfound()

class PopulateConfigBox:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data = commandSender.populateConfigBox()
            outJSON = json.dumps(data)
            return outJSON

class UpdateConfigFile:
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.updateConfigFile(web.input())
            outJSON = json.dumps(data)
            return outJSON


class SystemStatus:
    def GET(self):
        if LoginChecker.loggedIn():
            # Check status of system
            datetime = commandSender.outputTime()
            cameraFeedback, cameraBoolean = commandSender.cameraStatus()
            gpsFeedback, gpsBoolean = commandSender.gpsStatus()
            internetFeedback, internetBoolean = commandSender.internetStatus()
            extHDDFeedback, hdd0Boolean, hdd0Space, hdd1Boolean, hdd2Boolean, hdd3Boolean, hdd1Space, hdd2Space, hdd3Space = commandSender.hddStatus()
            vpnFeedback, vpnBoolean = commandSender.vpnStatus()

            # Encode to JSON
            data = {}
            data['consoleFeedback'] = datetime + cameraFeedback + extHDDFeedback + internetFeedback + vpnFeedback + gpsFeedback
            data['cameraStatus'] = cameraBoolean
            data['gpsStatus'] = gpsBoolean
            data['internetStatus'] = internetBoolean
            data['vpnStatus'] = vpnBoolean
            data['HDD0Status'] = hdd0Boolean
            data['HDD1Status'] = hdd1Boolean
            data['HDD2Status'] = hdd2Boolean
            data['HDD3Status'] = hdd3Boolean
            data['HDD0Space'] = hdd0Space
            data['HDD1Space'] = hdd1Space
            data['HDD2Space'] = hdd2Space
            data['HDD3Space'] = hdd3Space
            outJSON = json.dumps(data)
            return outJSON

# Start of execution
if __name__ == "__main__":
    app.run()