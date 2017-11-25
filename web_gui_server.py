"""""
 * * * * * * * * * *
 * Filename:    web_gui_server.py
 *
 * Purpose:     HTTP Server for DFN Cameras to serve the DFN Maintenance GUI
 *
 * Copyright:   2017 Fireballs in the Sky, all rights reserved
 *
 * * * * * * * * * *
"""""
# !/usr/bin/env python

# Start of execution
import os

from endpoint import app

if __name__ == "__main__":
    # Gets the DEV_ENVIRONMENT variable set within pycharms environment variables configuration script
    # If True then this script is being run on a dev machine, if false then it's running on a camera
    # Defaults to false
    environment = os.getenv('DEV_ENVIRONMENT', False)

    if environment is False:
        os.chdir("/opt/dfn-software/Desert-Fireball-Maintainence-GUI")

    app.run()
