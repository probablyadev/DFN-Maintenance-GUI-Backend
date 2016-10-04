import web

urls = ('/(.*)', 'Index')
web.config.debug = True

class Index:
    def __init__(self):
        self.render = web.template.render('templates/')

    def GET(self, name=None):
        return self.render.login()

    def POST(self, name):
        return None

if __name__ == '__main__' :
    app = web.application(urls, globals())
    app.run()