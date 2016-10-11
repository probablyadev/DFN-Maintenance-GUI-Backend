import web
import model
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
        return render.login(f, '')

    def POST(self):
        f = loginForm()

        if f.validates(): #If form lambdas are valid
            if model.loginAuth(f.d.username, f.d.password):
                raise web.seeother('/login')
            else:
                return render.login(f, 'ERROR: Incorrect credentials.')
        else:
            return render.login(f, 'ERROR: Form entry invalid.')


#Class for Maintenance GUI
class UI:
    def GET(self):
        if session.get('logged_in', False):
            f = loginForm()
            return '<a href="/logout">Logout</a>'
        else:
            raise web.seeother('/')

    def POST(self):
        raise web.seeother('/')

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