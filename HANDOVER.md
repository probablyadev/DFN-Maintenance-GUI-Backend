# Architecture

## Overview

### Summary

- [DFN-Maintenance-GUI](https://github.com/ScottDay/DFN-Maintenance-GUI): Handles GUI project build process.
- [DFN-Maintenance-GUI-Backend](https://github.com/ScottDay/DFN-Maintenance-GUI-Backend): API server and website host.
- [DFN-Maintenance-GUI-Config](https://github.com/ScottDay/DFN-Maintenance-GUI-Config): Stores backend private configuration.
- [DFN-Maintenance-GUI-Frontend](https://github.com/ScottDay/DFN-Maintenance-GUI-Frontend): Frontend source.
- [DFN-Maintenance-GUI-Installer](https://github.com/ScottDay/DFN-Maintenance-GUI-Installer): Installer / updater / project CLI manager.

### Services

- GitHub:
- Travis-CI:
- Semantic-Releases:
- Intellij PyCharm / WebStorm:

### Orchestration

#### Automatic

Not currently working with Travis, fix is to resetup each project in Travis under a new account.

1. Master branch commits on any repo triggers DFN-Maintenance-GUI project to build.
2. On Travis, each project is cloned and built.
3. The built project is uploaded to Docker and GitHub releases.
4. DFN-Maintenance-GUI-Installer (located on the camera servers) clones and updates / installs the GUI.
5. On camera startup, the GUI is updated (todo), launched and remains running until the daily shutdown.

#### Manual

1. Frontend: Run `npm run build`, copy the resulting `dist` folder into the root of the Backend project.
2. Backend: Run `sudo chmod 777 gui.py`, then `./gui.py --help` and provide the appropriate flags for your situation.

Make sure the camera is configured to startup the GUI on restart.

---

## Items Implemented / Tested

### Basic Functionality

#### Login

1. Password transferred over Internet encrypted: TESTED [EXT, SMALL]
2. Password stored on camera encrypted: TESTED [EXT, SMALL]
3. Timeout in case of inactivity - auto logout: TESTED [EXT, SMALL]

#### Web Interface - Status

1. Overall camera status: camera identification (get system hostname, location, printout from /opt/dfn-software/dfnstation.cfg): TESTED [EXT, SMALL]
2. Disk space usage (df command): TESTED [EXT, SMALL]
3. Internet connection status (ping google): TESTED [EXT, SMALL]
4. Check if interval control SW did run last night OK (check /data0/latest folder, what date it’s contents, interval log, any images recorded): TESTED [EXT, SMALL]
5. Current clock time / GPS status (query gpsd and / or leostick): TESTED [EXT, SMALL]

#### Web Interface – Actions

1. Update status: TESTED [EXT, SMALL]
2. Run interval control test, check result: TESTED [EXT, SMALL]
3. Turn on / off DSLR camera: TESTED [EXT, SMALL]
4. Turn on / off removable drives: TESTED [EXT, SMALL]
5. Check removable drives (run SMART test): TESTED [EXT, SMALL]
6. Format removable drives: TESTED [EXT, SMALL]
7. Check VPN link (ping 10.1.16.1): TESTED [EXT, SMALL]
8. Restart modem (could be reboot): TESTED [EXT, SMALL]
9. Restart VPN (service openvpn restart): TESTED [EXT, SMALL]
10. Configure the timezone: TESTED [EXT, SMALL]
11. Check GPS functionality: TESTED [EXT, SMALL]
12. Reboot the system (DFNEXT: shutdown -h now, also to poweroff the system in order to unplug power): TESTED [EXT, SMALL]
13. Change coordinates & location name to /opt/dfn-software/dfnstation.cfg: TESTED [EXT, SMALL]

### Extended Functionality

#### Enhancing User Experience

1. Browse/download/display data/images/videos folders; display images not videos at this stage
2. Initiate data move from /data0 to removable drives after replacing full ones with empty ones (that allows to actually run eg interval test if all was full): PARTIALLY-TESTED
3. Check modem link and signal strength: TESTED [EXT, SMALL]
4. Update python SW from eg local laptop / USB stick
5. Update leo stick firmware from eg local laptop / USB stick
6. Change parameters in dfnstation.cfg: TESTED [EXT, SMALL]
7. Check logs after the 1st night run of newly deployed camera (summary PASS/FAIL + possibility do display the log): PARTIALLY-IMPLEMENTED (can view logs)
8. Take video camera snapshot (download resulting image): PARTIALLY IMPLEMENTED
9. Take one picture using the DSLR camera & display it (also helps focussing cameras in the field): PARTIALLY-IMPLEMENTED
10. Test LC shutter (script exists, it generates 2 images that need to be downloaded and checked): PARTIALLY-IMPLEMENTED
11. Turn on/off video camera (/opt/dfn-software/enable_video.py, disable_video.py, DFNSMALL only – low prio): TESTED [EXT, SMALL]

#### Tasks Status and User Warning

1. Data compress / move script
2. Daily reboot
3. Interval SW state (service active / waiting, exposures in progress, test in progress): TESTED [EXT, SMALL]
4. Cloudsd active
5. Video record active
6. Event detection running / not: PARTIALLY-IMPLEMENTED (backend will do polling, returns status once task is complete)

---

## Projects

### [DFN-Maintenance-GUI](https://github.com/ScottDay/DFN-Maintenance-GUI)

If you're building the GUI project manually then this repo is of no concern.

### [DFN-Maintenance-GUI-Backend](https://github.com/ScottDay/DFN-Maintenance-GUI-Backend)

#### db/

Place any databases here, contained in this folder is a script for creating new encrypted databases.

Currently the gui project supports 2 different databases, one for development (dev.db), and one for production (auth.db).

The dev database username and password is: test

### sample/

This folder contains any sample data files used when developing / testing the gui project locally (rather than on the camera server).

### src/

This folder contains all the backend source code (excluding the main entry point script gui.py).

Folders:

- api/: Contains all the network endpoints that you can hit from the frontend / Postman.
- imported/: Any files used in the parent DFN project (not the GUI), rather than path manipulation to import the original, this allows for local development.
- setup/: Used when initially starting up the GUI, handles cli parsing, db init, logging init, and route registration.
- wrappers/: Decorators used on the api endpoints e.g. marking an endpoint as needing authentication, checking if authorized.

Files:

- console.py: Executes the provided commands on the server through bash, can either operate locally or over SSH (if using docker or remote developemnt).
- constants.py: Old constants file, kept for reference only.
- database.py: User database model.
- handler.py: Handler object is provided on each endpoint call, stores the logs, response, status code. Other objects are for log formatting.
- helpers.py: Utility functions.
- route.py: Route registration for the server itself (not the apis). Used for serving the frontend site and any assets.

### [DFN-Maintenance-GUI-Config](https://github.com/ScottDay/DFN-Maintenance-GUI-Config)

This private project stores the user auth database.

### [DFN-Maintenance-GUI-Frontend](https://github.com/ScottDay/DFN-Maintenance-GUI-Frontend)

#### config/

Contains the webpack configuration files (how to serve / build the site in development / production).

#### dist/

Created by running `npm run build`, this folder needs to be placed on the backend, in order to be served to the user.

#### public/

Contains any static assets and the base index.html file.

#### src/

Folders:

- modules/: Each subfolder represents a different page on the site, containing any page specific code.
- shared/: Code commonly used on different pages.

Files:

- App.jsx: App page container including sidenav, header, page routes.
- index.jsx: Main JS entry point in to the project. Sets up the store, themes, routing, and notification bar.

##### shared/

- actions/: Functions that interact with the api / store.
- components/: Basic components used on each page.
- constants/: Project constants, including endpoint urls, links, timezones, etc.
- containers/: Composes / wraps components into something more e.g. turn a `Card` into a `NetworkCard`.
- routes/: Page routes and their associated module.
- services/: Superagent for interacting with the backend over a network. History for interacting with browsers url bar.
- stores/: Stores / persists data on the browser.
- styles/: SCSS files for material design.
- themes/: Specifies different color themes for the site, currently only lightTheme. Switching logic is implemented, just need to place a button to switch themes, and specify a new theme e.g. darkTheme.

### [DFN-Maintenance-GUI-Installer](https://github.com/ScottDay/DFN-Maintenance-GUI-Installer)

The intention of this project is to provide a CLI interface to the GUI, allowing for us to easily update, launch, restart, etc...

Currently the update functionality is partially implemented.
