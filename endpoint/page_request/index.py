class Index:
    def GET(self):
        """
        Servers the request for the login page.

        Returns:
            The rendered HTML of the login template.
        """
        f = loginForm()

        return render.login(f, '')

    def POST(self):
        """
        Handles login form submission.

        Returns:
            The rendered HTML of the failed login page.

        On success, calls Login.login to raise the HTML of the Maintenance GUI.

        The login form data is extracted by web.py.
        """
        f = loginForm()

        if f.validates():  # If form lambdas are valid
            if model.loginAuth(f.d.username, f.d.password):
                Login.login()
            else:
                return render.login(f, 'ERROR: Incorrect credentials.')
        else:
            return render.login(f, 'ERROR: Form entry invalid.')