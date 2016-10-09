import web
from web import form

render = web.template.render('templates/')

urls = ('/', 'Index')
app = web.application(urls, globals())

loginForm = form.Form(
    form.Textbox("username", description='Username:'),
    form.Password("password", description='Password:'),
    form.Button('Login'))

class Index:
    def GET(self):
        f = loginForm()
        return render.login(f)

    def POST(self):
        f = loginForm()
        if not f.validates():
            return render.login(f)
        else:
            return "Great success! Username: %s, Password: %s" % (f.d.username, f.d.password)

if __name__=="__main__":
    app.run()