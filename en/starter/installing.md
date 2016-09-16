---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Installing Kitura
menu: starter
lang: en
redirect_from: "/starter/installing.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Installation

* [macOS](#macos)
* [Ubuntu Linux](#ubuntu-linux)
* [Docker](#docker)
* [Vagrant](#vagrant)

# macOS

1. Install [Homebrew](http://brew.sh/) (if you don't already have it installed):

    `$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

2. Install the necessary dependencies:

    `$ brew install curl`

3. Download and install [Xcode 8](https://developer.apple.com/download/).

Now you are ready to develop your first Kitura app. Check [Kitura-Sample](https://github.com/IBM-Swift/Kitura-Sample) or see [Getting Started](#getting-started).

> Note: if you have been using the Xcode 8 betas, you may also need to run `sudo xcode-select -r` to reset your selected developer directory.

# Ubuntu Linux

Kitura is tested on Ubuntu 14.04 LTS and Ubuntu 15.10.

1. Install the following system linux libraries:

    `$ sudo apt-get install libcurl4-openssl-dev uuid-dev`

2. Install the [required Swift version](#swift-version) from `swift.org`.

After installing it (i.e. extracting the `.tar.gz` file), make sure you update your `PATH` environment variable so that it includes the extracted tools: `export PATH=/<path to uncompress tar contents>/usr/bin:$PATH`.

Now you are ready to develop your first Kitura app. Check [Kitura-Sample](https://github.com/IBM-Swift/Kitura-Sample) or see [Getting Started](#getting-started).

# Docker

1. Install [Docker](https://www.docker.com/products/docker) on your development system.

2. Pull down the [kitura-ubuntu](https://hub.docker.com/r/ibmcom/kitura-ubuntu/) image from Docker Hub:

    `$ docker pull ibmcom/kitura-ubuntu:latest`

3. Create a Docker container using the `kitura-ubuntu` image you just downloaded and forward port 8090 on host to the container:

    `$ docker run -i -p 8090:8090 -t ibmcom/kitura-ubuntu:latest /bin/bash`

4. From within the Docker container, execute the `clone_build_kitura.sh` script to build the [Kitura-Starter-Bluemix](https://github.com/IBM-Swift/Kitura-Starter-Bluemix) sample project:

    `# /root/clone_build_kitura.sh`

    The last two output lines from executing the `clone_build_kitura.sh` script should be similar to:

    ```
    Linking .build/debug/Kitura-Starter-Bluemix
    >> Build for Kitura-Starter-Bluemix completed (see above for results).
    ```

5. You can now run the Kitura-Starter-Bluemix executable inside the Docker container:

    `# /root/start_kitura_sample.sh`

    You should see an output message that contains the string `Listening on port 8090`.

# Vagrant

1. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads).

2. Install [Vagrant](https://www.vagrantup.com/downloads.html).

3. From the root of the Kitura folder containing the `vagrantfile`, create and configure a guest machine:

    `$ vagrant up`

4. SSH into the Vagrant machine:

    `$ vagrant ssh`

5. As needed for development, edit the `vagrantfile` to setup [Synced Folders](https://www.vagrantup.com/docs/synced-folders/basic_usage.html) to share files between your host and guest machine.

Now you are ready to develop your first Kitura app. Check [Kitura-Sample](https://github.com/IBM-Swift/Kitura-Sample) or see [Getting Started](#getting-started).

