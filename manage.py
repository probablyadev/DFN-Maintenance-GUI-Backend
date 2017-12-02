import os

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from app.app import app, db

migrate = Migrate(app, db)
manager = Manager(app)

# Migrations.
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()


if __name__ == '__main__':
    # Gets the DEV_ENVIRONMENT variable set within pycharms environment variables configuration script
    # If True then this script is being run on a dev machine, if false then it's running on a camera
    # Defaults to false
    environment = os.getenv('DEV_ENVIRONMENT', False)

    if environment is False:
        os.chdir("/opt/dfn-software/Desert-Fireball-Maintainence-GUI")

    manager.run()
