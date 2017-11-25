import model
from endpoint import loginForm, render
from endpoint.page_request.login import Login


class Index:
    def GET(self):
        """
        Servers the request for the login page.

        Returns:
            The rendered HTML of the login template.
        """
        form = loginForm()

        return render.login(form, '')

    def POST(self):
        """
        Handles login form submission.

        Returns:
            The rendered HTML of the failed login page.

        On success, calls Login.login to raise the HTML of the Maintenance GUI.

        The login form data is extracted by web.py.
        """
        form = loginForm()

        if form.validates():  # If form lambdas are valid
            if model.loginAuth(form.d.username, form.d.password):
                Login.login()
            else:
                return render.login(form, 'ERROR: Incorrect credentials.')
        else:
            return render.login(form, 'ERROR: Form entry invalid.')