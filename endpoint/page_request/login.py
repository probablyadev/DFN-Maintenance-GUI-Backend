from endpoint import session


class Login:
    @staticmethod
    def login():
        """
        Logs the user in by manipulating their session.

        Raises:
             web.seeother: Raises the '/app' endpoint to the client.
        """
        session.logged_in = True

        raise web.seeother('/app')
