import web
from web import form

web.config.debug = False

#Initialising web.py app object
urls = ('/', 'Index',
        '/app', 'UI',
        '/login', 'Login',
        '/logout', 'Logout',)
app = web.application(urls, globals())

#Initialising useful web.py framework variables
render = web.template.render('templates/')
session = web.session.Session(app, web.session.DiskStore('sessions/'))

#Variable for the login form.
loginForm = form.Form(
    form.Textbox("username", description='Username:'),
    form.Password("password", description='Password:'),
    form.Button('Login'))


#Class for login page
class Index:
    def GET(self):
        f = loginForm()
        return render.login(f)

    def POST(self):
        f = loginForm()
        if not f.validates():
            return render.login(f)
        else:
            session.logged_in = True
            raise web.seeother('/maintain')

#Class for Maintenance GUI
class UI:
    def GET(self):
        if session.get('logged_in', False):
            f = loginForm()
            return '<a href="/logout">Logout</a>'
        else:
            raise web.seeother('/')

    def POST(self):
        return 0

#Classes for login and logout with sessions
class Login:
    def GET(self):
        session.logged_in = True
        raise web.seeother('/app')

class Logout:
    def GET(self):
        session.logged_in = False
        raise web.seeother('/')

#Start of execution
if __name__=="__main__":
    app.run()