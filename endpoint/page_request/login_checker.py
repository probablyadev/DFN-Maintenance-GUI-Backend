from endpoint import session


class LoginChecker:
    @staticmethod
    def loggedIn():
        """
        Checks whether the user's session is logged in.

        Returns:
            True for logged in, or raises the / endpoint if not logged in.

        Raises:
            web.seeother: Raises the '/' endpoint if not logged in.
        """
        if session.get('logged_in', False):
            return True
        else:
            raise web.seeother('/')