#################################################################
# Dockerfile to build Python backend for Desert Fireballs GUI
# Based on Ubuntu
#################################################################

#Use Ubuntu as base image
FROM ubuntu

#TODO[Scott/Ash]:Confirm if any applications need to be installed in 
#### addition to python being installed. 

#####################################################
# Example of application installation if needed

    # Add the application resources URL
    #RUN echo "deb http://archive.ubuntu.com/ubuntu/ $(lsb_release -sc) main universe" >> /etc/apt/sources.list

    # Update the sources list
    #RUN apt-get update

    # Install basic applications
    #RUN apt-get install -y tar git curl nano wget dialog net-tools build-essential
#####################################################

#Install Python and Python tools
RUN \
  apt-get update && \
  apt-get install -y python python-dev python-pip python-distribute python-virtualenv && \
  rm -rf /var/lib/apt/lists/*

#Set a working directory for container
WORKDIR /app

#Copy contents of current directory application into container
COPY . /app

#Use pip to download and install requirements
RUN pip install -r requirements.txt

#TODO[Ash]: Find a way to double check port number
#Expose default port
EXPOSE 80

#Set environment variables
ENV PYTHONUNBUFFERED=1
ENV APP_SETTINGS=prod

#Execute command
CMD [ "python", "main.py" ]
