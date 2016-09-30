---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Setting Up
menu: starter
lang: en
redirect_from: "/starter/setting up.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Setting Up

Kitura can run on both macOS and Linux. To start, you'll need to install a few prerequisites.

* [macOS](#macos)
* [Ubuntu Linux](#ubuntu-linux)

## macOS

1. Download and install [Xcode 8](https://developer.apple.com/download/).

## Ubuntu Linux

Kitura is tested on Ubuntu 14.04 LTS, Ubuntu 15.10, and Ubuntu 16.04 LTS.

1. Install the following Linux system packages:

    `$ sudo apt-get install libcurl4-openssl-dev uuid-dev`

2. Download a Swift 3.0 toolchain from [swift.org](https://swift.org/download/).

3. After extracting the `.tar.gz` file, update your `PATH` environment variable so that it includes the extracted tools: `export PATH=<path to uncompressed tar contents>/usr/bin:$PATH`.

# Next Steps

Now you are now ready to develop your first Kitura app. Learn how to [Get Started](/en/starter/gettingstarted.html).
