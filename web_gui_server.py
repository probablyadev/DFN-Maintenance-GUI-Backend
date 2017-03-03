"""""
 * * * * * * * * * *
 * Filename:    web_gui_server.py
 *
 * Purpose:     HTTP Server for DFN Cameras to serve the DFN Maintenance GUI
 *
 * Copyright: © 2017 Fireballs in the Sky, all rights reserved
 *
 * * * * * * * * * *
"""""
#!/usr/bin/env python

import web
import constants
from web import form
import os, model, commandSender, json, base64, datetime

# Initialising web.py config variables
web.config.debug = False
web.config.session_parameters['timeout'] = 3600

# Initialising web.py app object
urls = ('/', 'Index',
        '/app', 'UI',
        '/logout', 'Logout',
        '/gethostname', 'GetHostname',
        '/cameraon', 'CameraOn',
        '/cameraoff', 'CameraOff',
        '/videocameraon', 'VideoCameraOn',
        '/videocameraoff', 'VideoCameraOff',
        '/camerastatus', 'CameraStatus',
        '/findpictures', 'FindPictures',
        '/downloadpicture', 'DownloadPicture',
        '/removethumbnail', 'RemoveThumbnail',
        '/downloadthumbnail', 'DownloadThumbnail',
        '/gpscheck', 'GPSCheck',
        '/timezonechange', 'TimezoneChange',
        '/outputTime', 'OutputTime',
        '/intervaltest', 'IntervalTest',
        '/previntervaltest', 'PrevIntervalTest',
        '/enablehdd', 'EnableHDD',
        '/disablehdd', 'DisableHDD',
        '/mounthdd', 'MountHDD',
        '/unmounthdd', 'UnmountHDD',
        '/probehdd', 'ProbeHDD',
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

# Custom http response messages
def notfound():
    return web.notfound("The requested file(s) could not be found.")
app.notfound = notfound

# Initialising useful web.py framework variables
render = web.template.render('templates/')
session = web.session.Session(app, web.session.DiskStore('sessions/'))

# Variable for the login form.
loginForm = form.Form(
    form.Textbox("username", description='Username:'),
    form.Password("password", description='Password:'),
    form.Button('Login'))

"""""
 * * * * * * * *
 *
 *      Classes for handling page requests and login
 *
 * * * * * * * *
"""""
class Index:

    """""
     * Name:     Index.GET
     *
     * Purpose:  Serves the request for the login page
     *
     * Params:   None
     *
     * Return:   Rendered HTML of login template
     *
     * Notes:    None
    """""
    def GET(self):
        f = loginForm()
        return render.login(f, '')

    """""
     * Name:     Index.POST
     *
     * Purpose:  Handles login form submission
     *
     * Params:   None (However, the login form data is extracted by web.py)
     *
     * Return:   Rendered HTML of the login page (for failure to login)
     *
     * Notes:    On success, calls Login.login to raise the HTML of the Maintenance GUI
    """""
    def POST(self):
        f = loginForm()

        if f.validates():  # If form lambdas are valid
            if model.loginAuth(f.d.username, f.d.password):
                Login.login()
            else:
                return render.login(f, 'ERROR: Incorrect credentials.')
        else:
            return render.login(f, 'ERROR: Form entry invalid.')

class UI:
    """""
     * Name:     UI.GET
     *
     * Purpose:  Renders the Maintenance GUI
     *
     * Params:   None
     *
     * Return:   None
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            hostname = commandSender.getHostname()
            return render.app(hostname)

class Login:

    """""
     * Name:     Login.login
     *
     * Purpose:  Logs the user in, by manipulating their session
     *
     * Params:   None
     *
     * Return:   None, but raises the /app endpoint to the client
     *
     * Notes:    None
    """""
    @staticmethod
    def login():
        session.logged_in = True
        raise web.seeother('/app')

class Logout:
    """""
     * Name:     Logout.GET
     *
     * Purpose:  Logs the user out, by manipulating their session
     *
     * Params:   None
     *
     * Return:   None, but raises the / endpoint to the client
     *
     * Notes:    None
    """""
    def GET(self):
        session.logged_in = False
        raise web.seeother('/')

class LoginChecker:

    """""
     * Name:     LoginChecker.loggedIn
     *
     * Purpose:  Checks whether the user's session is logged in
     *
     * Params:   None
     *
     * Return:   Either returns True for logged in, or raises the / enpoint if not logged in.
     *
     * Notes:    None
    """""
    @staticmethod
    def loggedIn():
        if session.get('logged_in', False):
            return True
        else:
            raise web.seeother('/')

class GetHostname:

    """""
     * Name:     GetHostname.GET
     *
     * Purpose:  Gets the hostname of the current DFN Camera
     *
     * Params:   None
     *
     * Return:   A JSON object, in the form of
     *           {hostname : "DFNXXX}
     *
     * Notes:    None
    """""
    def GET(self):
        data = {}
        data['hostname'] = commandSender.getHostname()
        return json.dumps(data)


"""""
 * * * * * * * *
 *
 *      Classes for handling camera functionality
 *
 * * * * * * * *
"""""
# Camera
class CameraOn:

    """""
     * Name:     CameraOn.GET
     *
     * Purpose:  Switches the DSLR on
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           cameraStatus: A boolean representing whether the DSLR is turned on or off
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = commandSender.cameraOn()
                statusFeedback, statusBoolean = commandSender.cameraStatus()
                data['consoleFeedback'] += statusFeedback
                data['cameraStatus'] = statusBoolean
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class CameraOff:

    """""
     * Name:     CameraOn.GET
     *
     * Purpose:  Switches the DSLR off
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           cameraStatus: A boolean representing whether the DSLR is turned on or off
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = commandSender.cameraOff()
                statusFeedback, statusBoolean = commandSender.cameraStatus()
                data['consoleFeedback'] += statusFeedback
                data['cameraStatus'] = statusBoolean
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class VideoCameraOn:

    """""
     * Name:     VideoCameraOn
     *
     * Purpose:  Switches the video camera on
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *
     * Notes:    Doesn't return a boolean yet, because a way to detect the video camera's
     *           presence is still to be implemented.
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = commandSender.videoCameraOn()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class VideoCameraOff:

    """""
     * Name:     VideoCameraOff.GET
     *
     * Purpose:  Switches the video camera off
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *
     * Notes:    Doesn't return a boolean yet, because a way to detect the video camera's
     *           presence is still to be implemented.
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = commandSender.videoCameraOff()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class CameraStatus:

    """""
     * Name:     CameraStatus.GET
     *
     * Purpose:  Delivers a summary of the DSLR's status
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           cameraStatus: A boolean representing whether the DSLR is turned on or off
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['cameraStatus'] = commandSender.cameraStatus()
            outJSON = json.dumps(data)
            return outJSON

class FindPictures:

    """""
     * Name:     FindPictures.GET
     *
     * Purpose:  Fetches the filenames of pictures taken on the date specified
     *
     * Params:   None, but web.input fetches the input date specified by the user
     *
     * Return:   A JSON object with many keys, with the following format:
     *           {filecreationtime: filepath}
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            fileBankJSON = commandSender.findPictures(web.input())
            return json.dumps(fileBankJSON, sort_keys=True)

class DownloadPicture:

    """""
     * Name:     DownloadPicture.GET
     *
     * Purpose:  Fetches the specified .NEF file for the user to download
     *
     * Params:   None, but web.input fetches the filepath for download
     *
     * Return:   A JSON object with the following format:
     *           {success: boolean}
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['success'] = commandSender.downloadPicture(web.input())
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.NotFound(e.message)

            return outJSON

class DownloadThumbnail:

    """""
     * Name:     DownloadThumbnail.GET
     *
     * Purpose:  Fetches the specified .jpg file for the user to download
     *
     * Params:   None, but web.input fetches the filepath for jpg extraction
     *
     * Return:   A JSON object with the following format:
     *           {success: boolean}
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['success'] = commandSender.downloadThumbnail(web.input())
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.NotFound(e.message)

            return outJSON

class RemoveThumbnail:

    """""
     * Name:     RemoveThumbnail.GET
     *
     * Purpose:  Deletes the specified thumbnail from the camera's filesystem
     *
     * Params:   None, but web.input fetches the filepath to delete
     *
     * Return:   A JSON object with the following format:
     *           {success: boolean}
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():

            try:
                commandSender.removeThumbnail(web.input())
            except IOError as e:
                raise web.InternalError(e.message)

            return 0

# Hard drives
class EnableHDD:

    """""
     * Name:     EnableHDD.GET
     *
     * Purpose:  Switches the camera's external hard drives on
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           HDD0Status, HDD1Status, HDD2Status, HDD3Status: Integers representing the status
     *               of each external hard drive.
     *           HDD0Space, HDD1Space, HDD2Space, HDD3Space: Real numbers representing the occupied
     *               space of each external hard drive.
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            try:
                data['consoleFeedback'] = commandSender.hddOn()
                statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
                data['consoleFeedback'] += statusFeedback
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class DisableHDD:

    """""
     * Name:     DisableHDD.GET
     *
     * Purpose:  Switches the camera's external hard drives off
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           HDD0Status, HDD1Status, HDD2Status, HDD3Status: Integers representing the status
     *               of each external hard drive.
     *           HDD0Space, HDD1Space, HDD2Space, HDD3Space: Real numbers representing the occupied
     *               space of each external hard drive.
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = commandSender.hddOff()
                statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
                data['consoleFeedback'] += statusFeedback
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class MountHDD:

    """""
     * Name:     MountHDD.GET
     *
     * Purpose:  Mounts the powered HDDs to the filesystem
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           HDD0Status, HDD1Status, HDD2Status, HDD3Status: Integers representing the status
     *               of each external hard drive.
     *           HDD0Space, HDD1Space, HDD2Space, HDD3Space: Real numbers representing the occupied
     *               space of each external hard drive.
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = commandSender.mountHDD()
                statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
                data['consoleFeedback'] += statusFeedback
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class UnmountHDD:

    """""
     * Name:     UnmountHDD.GET
     *
     * Purpose:  Unmounts the powered HDDs from the filesystem
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           HDD0Status, HDD1Status, HDD2Status, HDD3Status: Integers representing the status
     *               of each external hard drive.
     *           HDD0Space, HDD1Space, HDD2Space, HDD3Space: Real numbers representing the occupied
     *               space of each external hard drive.
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = commandSender.unmountHDD()
                statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
                data['consoleFeedback'] += statusFeedback
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class ProbeHDD:

    """""
     * Name:     ProbeHDD.GET
     *
     * Purpose:  Searches for present drives to format
     *
     * Params:   None
     *
     * Return:   A JSON object with many keys, with the following format;
     *           {/dev/sdxx: /datax /dev/sdxx}
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():

            try:
                data = commandSender.probeHDD()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class FormatHDD:

    """""
     * Name:     FormatHDD.GET
     *
     * Purpose:  Formats specified drives
     *
     * Params:   None, but web.input fetches the args for the format hdd script
     *
     * Return:   A JSON object with the variables:
     *           consoleFeedback: An output string to give the user feedback
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            try:
                data['consoleFeedback'] = commandSender.formatHDD(web.input().args)
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)
            except RuntimeError as e:
                raise web.InternalError(e.message)

            return outJSON

class CheckHDD:

    """""
     * Name:     CheckHDD.GET
     *
     * Purpose:  Delivers a summary of the external hard drives' status
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           HDD0Status, HDD1Status, HDD2Status, HDD3Status: Integers representing the status
     *               of each external hard drive.
     *           HDD0Space, HDD1Space, HDD2Space, HDD3Space: Real numbers representing the occupied
     *               space of each external hard drive.
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'], data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class SmartTest:

    """""
     * Name:     SmartTest.GET
     *
     * Purpose:  Performs a smart test
     *
     * Params:   None
     *
     * Return:   A JSON object with the variables:
     *           consoleFeedback: An output string to give the user feedback
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            try:
                data['consoleFeedback'] = commandSender.smartTest()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)
            except OSError as e:
                raise web.InternalError(e.message)
            except AssertionError as e:
                raise web.Conflict(e.message)

            return outJSON

# GPS/Time
class GPSCheck:

    """""
     * Name:     GPSCheck.GET
     *
     * Purpose:  Delivers a summary of the GPS' status
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           gpstatus: A boolean representing the status of the GPS
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'], data['gpsStatus'] = commandSender.gpsStatus()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class TimezoneChange:

    """""
     * Name:     TimezoneChange.GET
     *
     * Purpose:  Changes the system's timezone
     *
     * Params:   None, but web.input fetches the timezone information from the user
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            timezone = web.input().zone
            data['consoleFeedback'] = commandSender.timezoneChange(timezone)
            outJSON = json.dumps(data)
            return outJSON

class OutputTime:

    """""
     * Name:     OutputTime.GET
     *
     * Purpose:  Outputs the current system time to the user
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback.
     *               Includes current system time.
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'] = commandSender.outputTime()
            outJSON = json.dumps(data)
            return outJSON

# Network
class InternetCheck:

    """""
     * Name:     InternetCheck.GET
     *
     * Purpose:  Delivers a summary of the internet connectivity of the system.
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           internetStatus: A boolean representing the internet connectivity
     *               of the system
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['internetStatus'] = commandSender.internetStatus()
            outJSON = json.dumps(data)
            return outJSON

class RestartModem:

    """""
     * Name:     RestartModem.GET
     *
     * Purpose:  Restarts the modem network interface
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           internetStatus: A boolean representing the internet connectivity
     *               of the system
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            restartFeedback = commandSender.restartModem()
            statusFeedback, data['internetStatus'] = commandSender.internetStatus()
            data['consoleFeedback'] = restartFeedback + statusFeedback
            outJSON = json.dumps(data)
            return outJSON

class VPNCheck:

    """""
     * Name:     VPNCheck.GET
     *
     * Purpose:  Delivers a summary of the vpn connectivity of the system.
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           vpnStatus: A boolean representing the vpn connectivity of the system
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['vpnStatus'] = commandSender.vpnStatus()
            outJSON = json.dumps(data)
            return outJSON

class RestartVPN:

    """""
     * Name:     RestartVPN.GET
     *
     * Purpose:  Restarts the system's VPN daemon
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           vpnStatus: A boolean representing the vpn connectivity of the system
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}
            restartFeedback = commandSender.restartVPN()
            statusFeedback, data['vpnStatus'] = commandSender.vpnStatus()
            data['consoleFeedback'] = restartFeedback + statusFeedback
            outJSON = json.dumps(data)
            return outJSON

# Status/Advanced
class StatusConfig:

    """""
     * Name:     StatusConfig.GET
     *
     * Purpose:  Serves the dfnstation.cfg file to the user to read.
     *
     * Params:   None
     *
     * Return:   A Base64 encoded string; the contents of dfnstation.cfg
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            path = constants.dfnconfigPath
            if os.path.exists(path):
                getFile = file(path, 'rb')
                web.header('Content-type', 'application/octet-stream')
                web.header('Content-transfer-encoding', 'base64')
                return base64.standard_b64encode(getFile.read())
            else:
                raise web.notfound()

class LatestLog:

    """""
     * Name:     LatestLog.GET
     *
     * Purpose:  Serves the latest logfile from interval control
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           file: The contents of the logfile
     *           timestamp: The timestamp that the logfile was last modified
     *
     * Notes:    None
    """""
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

    """""
     * Name:     LatestPrevLog.GET
     *
     * Purpose:  Serves the second-latest logfile from interval control
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           file: The contents of the logfile
     *           timestamp: The timestamp that the logfile was last modified
     *
     * Notes:    None
    """""
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

    """""
     * Name:     PopulateConfigBox.GET
     *
     * Purpose:  Serves information to fill in the interface for changing the dfnstation.cfg file
     *
     * Params:   None
     *
     * Return:   A JSON object with many keys the following format:
     *           {param: value}
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data = commandSender.populateConfigBox()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class UpdateConfigFile:

    """""
     * Name:     UpdateConfigFile.GET
     *
     * Purpose:  Updates the dfnstation.cfg file with a new value for a parameter
     *
     * Params:   None, but web.input fetches the modified parameter, and the new value for it.
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = commandSender.updateConfigFile(web.input())
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class SystemStatus:

    """""
     * Name:     SystemStatus.GET
     *
     * Purpose:  Provides an overall status of the system to the user
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleOutput: An output string to give the user feedback
     *           cameraStatus: A boolean representing the camera's status
     *           gpsStatus: A boolean representing the GPSs status
     *           internetStatus: A boolean representing the internet connectivity of the system
     *           vpnStatus: A boolean representing the vpn connectivity of the system
     *           HDD0Status, HDD1Status, HDD2Status, HDD3Status: Integers representing
     *               the status of each external hard drive
     *           HDD0Space, HDD1Space, HDD2Space, HDD3Space: A real number representing
     *               the occupied space of each external hard drive
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            # Check status of system
            try:
                datetime = commandSender.outputTime()
                cameraFeedback, cameraBoolean = commandSender.cameraStatus()
                gpsFeedback, gpsBoolean = commandSender.gpsStatus()
                internetFeedback, internetBoolean = commandSender.internetStatus()
                extHDDFeedback, hdd0Boolean, hdd0Space, hdd1Boolean, hdd2Boolean, hdd3Boolean, hdd1Space, hdd2Space, hdd3Space = commandSender.hddStatus()
                vpnFeedback, vpnBoolean = commandSender.vpnStatus()

                # Encode to JSON
                data = {}
                data['consoleFeedback'] = constants.systemStatusHeader + datetime + cameraFeedback + extHDDFeedback + internetFeedback + vpnFeedback + gpsFeedback
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
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

# Interval Control Test
class IntervalTest:

    """""
     * Name:     IntervalTest.GET
     *
     * Purpose:  Performs an interval control test on the system
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *           intervalTestResult: A boolean representing if the test passed or failed
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'], data['intervalTestResult'] = commandSender.intervalTest()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON

class PrevIntervalTest:

    """""
     * Name:     PrevIntervalTest.GET
     *
     * Purpose:  Checks the /latest folder to see if the camera took
     *           pictures the last time interval control ran
     *
     * Params:   None
     *
     * Return:   A JSON object with the following variables:
     *           consoleFeedback: An output string to give the user feedback
     *
     * Notes:    None
    """""
    def GET(self):
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = commandSender.prevIntervalTest()
                outJSON = json.dumps(data)
            except AttributeError as e:
                raise web.InternalError('Latest photo directory (/data0/latest) corrupt or not present.')

            return outJSON

# Start of execution
if __name__ == "__main__":
    # os.chdir("/opt/dfn-software/GUI") # NB: Uncomment when GUI is put on system
    app.run()
