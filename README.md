<div align="center">
    <img src="http://fireballsinthesky.com.au/wp-content/uploads/sites/7/2017/04/fireballs-in-the-sky-logo41.png" alt="desert fireballs banner" align="center" />
</div>

<br />

<div align="center"><strong>GUI for maintaining the camera network for the Fireballs in the Sky project.</strong></div>
<div align="center">Frontend written in React + Redux with a Python + Flask backend.</div>

<br />

<div align="center">
  <!-- Dependency Status -->
  <a href="https://david-dm.org/ScottDay/Desert-Fireball-Maintainence-GUI">
    <img src="https://david-dm.org/ScottDay/Desert-Fireball-Maintainence-GUI.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/ScottDay/Desert-Fireball-Maintainence-GUI#info=devDependencies">
    <img src="https://david-dm.org/ScottDay/Desert-Fireball-Maintainence-GUI.svg" alt="devDependency Status" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/ScottDay/Desert-Fireball-Maintainence-GUI">
    <img src="https://travis-ci.org/ScottDay/Desert-Fireball-Maintainence-GUI.svg" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
  <a href="https://coveralls.io/repos/ScottDay/Desert-Fireball-Maintainence-GUI">
    <img src="https://coveralls.io/repos/github/ScottDay/Desert-Fireball-Maintainence-GUI/badge.svg" alt="Test Coverage" />
  </a>
</div>

<br />

<div align="center">
  <sub>Created by <a href="https://github.com/CPedersen3245">Campbell Pedersen</a> and maintained with ❤️ by <a href="https://github.com/ScottDay">Scott Day</a>.</sub>
</div>

# Desert Fireball Network - Camera Maintenance GUI

This is the code for the GUI which will be used to maintain the camera
network for the Fireballs in the Sky project.

For those who do look at this repository, please note that this system
is meant to be installed and run on our cameras placed out in the field.
You can install it on your own machine, however the backend is not
simulated to run without the camera as of yet.

# TODO

Checkout [TODO.md]

# ISSUES

Checkout [ISSUES.md]

# Requirements

These requirements are a loose guide, it just happens to be what I've
tested the code base against. In order to install the system and its
dependencies, you will need to install the following:

- Python: 3.6.* or 2.7.*
- Node: 7.*
- NPM: 4.0.*

# Installing

The following instructions are tried and tested on a ubuntu system,
however I have tried to keep it as generic as possible. The best way to
go about installing is to do the following instructions in order,
starting with:

1. Update your local package index:

```{r, engine='shell', count_lines}
sudo apt-get update
```

2. Upgrade any outdated packages:

```{r, engine='shell', count_lines}
sudo apt-get upgrade
```

## Frontend

### Install Node.js and NPM

1. Install the PPA (Personal Package Archive) for the currently active
    release (the 7.* branch):

```{r, engine='shell', count_lines}
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash
```

2. The PPA will be added into your APT configuration, and your local
    package cache will be automatically updated:

```{r, engine='shell', count_lines}
sudo apt-get install nodejs
```

> **Note:** The Node.js package contains the Node.js binary as well as
> **npm**, so you don't need to install **npm** separately. However, in
> order for some **npm** packages to work (such as those that require
> building from source), you will need to install the build-essentials
> package.

3. Install build-essentials:

```{r, engine='shell', count_lines}
sudo apt-get install build-essential
```

### Install Front-end Requirements

Navigate into the frontend/ directory and install the dependencies
listed in package.json

```{r, engine='shell', count_lines}
$ cd frontend
$ npm install
```

## Backend

### Installing Python

This project is capable of running with either Python 2 or 3, however
it is highly recommended to stick with Python 3, as Python 2 is used
only as a backup to fall back on.

Note that all Python related commands after this section assume the 
command to invoke the Python interpreter is `python`, if that is not 
the case on your system then substitute `python` with whatever your 
system makes use of. If you are not sure what the python command is 
on your system, then sift through the Python 3 and 2 instructions 
below, and try each alias followed by the version flag e.g. 
`python3 --version`, `python2.7 --version`, etc.

#### Python 3

These instructions are taken from [Python 3 installation docs](http://docs.python-guide.org/en/latest/starting/install3/linux/).

1. To see which version of Python 3 you have installed, open a command
    prompt and run:

```{r, engine='shell', count_lines}
$ python3 --version
```

or

```{r, engine='shell', count_lines}
$ python3.6 --version
```

2. Check that the outputted version matches what is listed in
    [runtime.txt]

    > If the major and minor versions do match (i.e. the first two numbers,
    > e.g. 3.6), then you may ignore the remaining Python installation steps.

3. Install Python 3:

..* If using Ubuntu 17.04 or earlier:

```{r, engine='shell', count_lines}
$ sudo apt-get update
$ sudo apt-get install python3.6
```

..* If using another version:

```{r, engine='shell', count_lines}
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt-get update
$ sudo apt-get install python3.6
```

..* If using a distribution other that Ubuntu, you can install Python 3
    using your distributions package manager (dnf is a stub):

```{r, engine='shell', count_lines}
$ sudo dnf install python3.6
```

4. Invoking Python 3:

..* After installation for Ubuntu 14.04, 16.04, 16.10 and 17.04, you can
    invoke the Python 3.6 interpreter using:

```{r, engine='shell', count_lines}
$ python3.6
```

..* Ubuntu 17.10 comes with Python 3.6 as default. You can use the
    following to invoke it:

```{r, engine='shell', count_lines}
$ python3
```

#### Python 2

These instructions are taken from [Python 2 installation docs](http://docs.python-guide.org/en/latest/starting/install/linux/).

Most linux distributions come with Python 2.7 out of the box.

1. To see which version of Python 2 you have installed, open a command
    prompt and run:

```{r, engine='shell', count_lines}
$ python --version
```

or

```{r, engine='shell', count_lines}
$ python2 --version
```

or

```{r, engine='shell', count_lines}
$ python2.7 --version
```

2. Check that the outputted version matches what is listed in
    [runtime.txt]

    > If the major and minor versions do match (i.e. the first two numbers,
    > e.g. 2.7), then you may ignore the remaining Python installation steps.

3. Install Python 2 using your distributions package manager (dnf is a
    stub):

```{r, engine='shell', count_lines}
$ sudo dnf install python2
```

#### Setuptools & pip

With [setuptools](https://pypi.python.org/pypi/setuptools) and
[pip](https://pip.pypa.io/en/stable/), you can download, install, and
uninstall any Python software, such as those listed in
[requirements.txt].

> Python 2.7.9 and later, and Python 3.4 and later include pip by
> default.

To see if pip is installed, open a command prompt and run:

```{r, engine='shell', count_lines}
$ command -v pip
```

To install pip, follow this [pip installation guide](https://pip.pypa.io/en/latest/installing/).

Note that on some Linux distributions the pip command is meant for
Python 2, while the pip3 command is meant for Python 3.

```{r, engine='shell', count_lines}
$ command -v pip3
```

#### Pipenv & Virtual Environments

Refer to this [guide](http://docs.python-guide.org/en/latest/dev/virtualenvs/#virtualenvironments-ref)
for using Pythons virtual environment, if you wish to make use of it.

### Install Back-end Requirements

Before any of the Python backend requirements can be installed, in
order for the bccrypt library to work you must first make sure that
the follow libraries are installed, use:

```{r, engine='shell', count_lines}
sudo apt-get install build-essential libffi-dev python-dev
```

All the Python dependencies are located in [requirements.txt]. To
install them, open a command prompt, navigate to the projects root
directory and use:

    > **Note:** The following code is assuming Python 3, if using
    > Python 2 then substitute `pip3` with `pip`.

```{r, engine='shell', count_lines}
$ pip3 install -r requirements.txt
```

# Running

The following instructions require a seperate terminal instance for 
running the back-end and the front-end at the same time.

If you haven't setup the database connection before now, complete the 
[database](#database) section first and return back here when you're done.

## Run Back-End

```{r, engine='shell', count_lines}
$ python manage.py runserver
```

If all goes well, you should see:

```{r, engine='shell', count_lines}
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

## Run Front-End

```{r, engine='shell', count_lines}
$ cd frontend
$ npm start
```

Open your browser to http://localhost:3000/ and the maintenance GUI 
should appear, from here you can log in using your account and 
continue without errors (hopefully).

# Database

If you decide on MySQL, install the free community edition of [MySQL](https://dev.mysql.com/downloads/mysql/), 
and [MySQL Workbench](https://www.mysql.com/products/workbench/).

1. Start MySQL from the System Preferences.
2. Open MySQL Workbench and [create a database](http://stackoverflow.com/questions/5515745/create-a-new-database-with-mysql-workbench) 
    called mydatabase but don't create the tables since Python will 
    do that for you.
3. Install the MySQL connector for Python, add the DATABASE_URL 
    configuration, and create the database and tables.

    > **Note:** You do not need to run `python manage.py db upgrade` 
    > or `python manage.py db migrate` if its your first go at it.

```{r, engine='shell', count_lines}
$ sudo pip install mysql-connector-python-rf
$ export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/mydatabase"
$ python manage.py create_db
```

## Database Types

If you're using a different database than mysql, or even if you are using 
mysql, you must first export the database url. Here are some examples:

```{r, engine='shell', count_lines}
$ export DATABASE_URL="postgresql://username:password@localhost/mydatabase"

or

$ export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/mydatabase"

or

$ export DATABASE_URL="sqlite:///your.db"
```

# Testing

## Test Front-End

TBA (To Be Added).

## Test Back-End

```{r, engine='shell', count_lines}
$ python test.py --cov-report=term --cov-report=html --cov=application/ tests/
```

# Documentation

