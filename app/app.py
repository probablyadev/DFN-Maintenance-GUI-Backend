from flask import Response, current_app, request, redirect, abort
from flask_login import login_required, login_user, logout_user, login_manager

from app import create_app
from app.endpoint.camera import camera_api
from app.model import login_auth

app = create_app()

app.register_blueprint(camera_api)

@app.route("/")
@login_required
def home():
    """
    Default home page.

    :return:
        A HTML response to load.
    """
    return Response("Home Page (TODO: Remove this")


# somewhere to login
@app.route("/login", methods = ["GET", "POST"])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if login_auth(username, password):
            return redirect(request.args.get("next"))
        else:
            return abort(401)
    else:
        # TODO: Return response that is the login page.
        return Response('''
        <form action="" method="post">
            <p><input type=text name=username>
            <p><input type=password name=password>
            <p><input type=submit value=Login>
        </form>
        ''')


@app.route("/logout")
@login_required
def logout():
    """
    Somewhere to logout.

    :return:
    """
    logout_user()
    # TODO: Update the response.
    return Response('<p>Logged out</p>')


@login_manager.user_loader
def load_user(userid):
    """
    Callback to reload the user object.

    :param userid:
    :return:
    """
    return User(userid)