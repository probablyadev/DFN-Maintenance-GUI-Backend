import web
from web import form

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
        '/cfcheck', 'CFCheck',
        '/intervaltest', 'IntervalTest',
        '/previntervaltest', 'PrevIntervalTest',
        '/enablehdd', 'EnableHDD',
        '/disablehdd', 'DisableHDD',
        '/mounthdd', 'MountHDD',
        '/unmounthdd', 'UnmountHDD',
        '/probehdd', 'ProbeHDD',
        '/movedata0', 'MoveData0',
        '/formathdd', 'FormatHDD',
        '/smarttest', 'SmartTest',
        '/hddcheck', 'CheckHDD',
        '/internetcheck', 'InternetCheck',
        '/restartmodem', 'RestartModem',
        '/vpncheck', 'CheckVPN',
        '/restartvpn', 'RestartVPN',
        '/systemstatus', 'SystemStatus',
        '/statusconfig', 'StatusConfig',
        '/getlatestlog', 'LatestLog',
        '/getlatestprevlog', 'LatestPrevLog',
        '/populateconfigbox', 'PopulateConfigBox',
        '/updateconfigfile', 'UpdateConfigFile')

app = web.application(urls, globals())


# Custom http response messages
def not_found():
    return web.notfound("The requested file(s) could not be found.")


app.notfound = not_found

# Initialising useful web.py framework variables
render = web.template.render('templates/')
session = web.session.Session(app, web.session.DiskStore('sessions/'))

# Variable for the login form.
loginForm = form.Form(
        form.Textbox("username", description = 'Username:'),
        form.Password("password", description = 'Password:'),
        form.Button('Login'))
