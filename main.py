import os

from backend import flaskapp 

if __name__ == '__main__':
    if "APP_SETTINGS" not in os.environ:
        os.environ["APP_SETTINGS"] = "prod"

    flaskapp.run(host = '0.0.0.0')
