class UI:
    def GET(self):
        """
        Renders the maintenance GUI.

        Returns:
            The rendered HTML of the maintenance GUI.
        """
        if LoginChecker.loggedIn():
            hostname = commandSender.getHostname()

            return render.app(hostname)