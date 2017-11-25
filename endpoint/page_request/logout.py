from endpoint import session


class Logout:
    def GET(self):
        """
        Logs the user out by manipulating their session.


        Raises:
            web.seeother: Raises the '/' endpoint to the client.
        """
        session.logged_in = False

        raise web.seeother('/')