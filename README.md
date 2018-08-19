<div align="center">
    <img src="http://fireballsinthesky.com.au/wp-content/uploads/sites/7/2017/04/fireballs-in-the-sky-logo41.png" alt="desert fireballs banner" align="center" />
</div>

<br />
<div align="center"><strong>Back end server for the camera maintenance GUI within the Desert Fireball Camera Network.</strong></div>
<div align="center">Backend written in Python + Flask.</div>
<br />

<div align="center">
    <!-- Github Status -->
    <a href="https://github.com/ScottDay/DFN-Maintenance-GUI-Backend/releases">
        <img src="https://img.shields.io/github/release/ScottDay/DFN-Maintenance-GUI-Backend.svg" alt="Latest Release Tag" />
    </a>
	<a href="https://github.com/ScottDay/DFN-Maintenance-GUI-Backend/commits">
        <img src="https://img.shields.io/github/commits-since/ScottDay/DFN-Maintenance-GUI-Backend/latest.svg" alt="Commit Count Since Last Release Tag" />
    </a>
    <!-- Build Status -->
    <a href="https://travis-ci.org/ScottDay/DFN-Maintenance-GUI-Backend">
        <img src="https://img.shields.io/travis/com/ScottDay/DFN-Maintenance-GUI-Backend.svg?label=master" alt="Master Branch Build Status" />
    </a>
	<a href="https://travis-ci.org/ScottDay/DFN-Maintenance-GUI-Backend">
        <img src="https://img.shields.io/travis/com/ScottDay/DFN-Maintenance-GUI-Backend/develop.svg?label=develop" alt="Develop Branch Build Status" />
    </a>
    <!-- License Scan Status -->
	<a href="https://app.fossa.io/projects/git%2Bgithub.com%2FScottDay%2FDFN-Maintenance-GUI-Backend?ref=badge_shield" alt="FOSSA Status">
		<img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2FScottDay%2FDFN-Maintenance-GUI-Backend.svg?type=shield"/>
	</a>
</div>
<br />

<div align="center">
  <sub>Created by <a href="https://github.com/CPedersen3245">Campbell Pedersen</a> and maintained with ❤️ by <a href="https://github.com/ScottDay">Scott Day</a>.</sub>
</div>

* * *

This is the code for the GUI which will be used to maintain the camera
network for the Fireballs in the Sky project.

For those who do look at this repository, please note that this system
is meant to be installed and run on our cameras placed out in the field.
You can install it on your own machine, however the backend is not
simulated to run without the camera as of yet.

# Running Development

```{r, engine='shell', count_lines}
$ pip3 install -r requirements/dev.txt
$ python3 db/create_db.py
$ python3 main.py dev
```

# Running Production

First make sure you have auth.db in the db/ folder.
main.py can optionally take the argument "prod".

```{r, engine='shell', count_lines}
$ pip3 install -r requirements.txt
$ python3 main.py
```

# License

This project is licensed under the MIT license, Copyright (c) 2018 Ryan Scott Day.
