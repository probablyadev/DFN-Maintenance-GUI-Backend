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

All the Python dependencies are located in [requirements.txt]. To
install them, open a command prompt, navigate to the projects root
directory and use:

    > **Note:** The following code is assuming Python 3, if using
    > Python 2 then substitute `pip3` with `pip`.

```{r, engine='shell', count_lines}
$ pip3 install -r requirements.txt
```
