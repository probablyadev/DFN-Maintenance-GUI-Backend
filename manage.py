import os
from flask import url_for
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from backend import flaskapp, db

migrate = Migrate(flaskapp, db)
manager = Manager(flaskapp)

# Migrations.
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()

@manager.command
def list_routes():
    import urllib
    output = []
    for rule in flaskapp.url_map.iter_rules():

        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        methods = ','.join(rule.methods)
        url = url_for(rule.endpoint, **options)
        line = urllib.unquote("{:50s} {:20s} {}".format(rule.endpoint, methods, url))
        output.append(line)

    for line in sorted(output):
        print(line)

if __name__ == '__main__':
    if "APP_SETTINGS" not in os.environ:
        os.environ["APP_SETTINGS"] = "prod"

    # environment = os.getenv('APP_SETTINGS')

    # if environment is "prod":
    #    os.chdir("/opt/dfn-software/Desert-Fireball-Maintainence-GUI")

    #manager.run()
    flaskapp.run(host = '0.0.0.0')
